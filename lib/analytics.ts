import type { NextRequest } from 'next/server';

// ── Types ──────────────────────────────────────────────────────────────────
export interface VisitRecord {
    ip: string;          // anonymised — last IPv4 octet zeroed
    path: string;
    referrer: string;
    ua: string;
    ts: number;          // unix ms
    country?: string;
}

// ── IP anonymisation ───────────────────────────────────────────────────────
export function anonymiseIp(raw: string): string {
    if (!raw) return 'unknown';
    const ip = raw.split(',')[0].trim();
    // IPv4: zero last octet
    const v4 = ip.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3})\.\d{1,3}$/);
    if (v4) return `${v4[1]}.0`;
    // IPv6: keep first 4 groups only
    if (ip.includes(':')) return ip.split(':').slice(0, 4).join(':') + '::';
    return 'unknown';
}

// ── IP extraction from Next request ───────────────────────────────────────
export function extractIp(req: NextRequest): string {
    const forwarded = req.headers.get('x-forwarded-for');
    const real = req.headers.get('x-real-ip');
    const raw = forwarded ?? real ?? '127.0.0.1';
    return anonymiseIp(raw);
}

// ── Device detection (no extra dependency) ────────────────────────────────
export function detectDevice(ua: string): 'mobile' | 'tablet' | 'desktop' | 'bot' {
    const u = ua.toLowerCase();
    if (/bot|crawl|spider|slurp|facebookexternalhit|linkedinbot/.test(u)) return 'bot';
    if (/tablet|ipad/.test(u)) return 'tablet';
    if (/mobile|android|iphone|ipod/.test(u)) return 'mobile';
    return 'desktop';
}

// ── In-memory fallback (local dev without Redis env vars) ─────────────────
const memStore: VisitRecord[] = [];

// ── Redis client (lazy — doesn't crash when env vars are absent) ───────────
async function getRedis() {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) return null;
    const { Redis } = await import('@upstash/redis');
    return new Redis({ url, token });
}

// ── Public API ─────────────────────────────────────────────────────────────
export async function recordVisit(visit: VisitRecord): Promise<void> {
    const redis = await getRedis();
    if (redis) {
        const key = `visit:${visit.ts}:${Math.random().toString(36).slice(2)}`;
        // Store individual visit (expire after 90 days)
        await redis.set(key, JSON.stringify(visit), { ex: 60 * 60 * 24 * 90 });
        // Increment counters
        await redis.incr('counter:total');
        await redis.incr(`counter:page:${visit.path}`);
        if (visit.country) await redis.incr(`counter:country:${visit.country}`);
        // Push to recent list (keep last 200)
        await redis.lpush('visits:recent', JSON.stringify(visit));
        await redis.ltrim('visits:recent', 0, 199);
        // Track unique IPs with a set
        await redis.sadd('ips:unique', visit.ip);
    } else {
        // In-memory fallback
        memStore.unshift(visit);
        if (memStore.length > 200) memStore.pop();
    }
}

export async function getStats(): Promise<{
    totalViews: number;
    uniqueIps: number;
    byPage: Array<{ page: string; count: number }>;
    byCountry: Array<{ country: string; count: number }>;
    recent: VisitRecord[];
    usingRedis: boolean;
}> {
    const redis = await getRedis();

    if (redis) {
        const [total, uniqueCount, recentRaw] = await Promise.all([
            redis.get<number>('counter:total'),
            redis.scard('ips:unique'),
            redis.lrange('visits:recent', 0, 49),
        ]);

        // Scan page counters
        const pageKeys: string[] = [];
        let cursor = 0;
        do {
            const [next, keys] = await redis.scan(cursor, { match: 'counter:page:*', count: 100 });
            cursor = Number(next);
            pageKeys.push(...(keys as string[]));
        } while (cursor !== 0);

        const pageCounts = pageKeys.length > 0
            ? await Promise.all(pageKeys.map(k => redis.get<number>(k)))
            : [];

        const byPage = pageKeys
            .map((k, i) => ({ page: k.replace('counter:page:', ''), count: pageCounts[i] ?? 0 }))
            .sort((a, b) => b.count - a.count);

        // Scan country counters
        const countryKeys: string[] = [];
        let ccursor = 0;
        do {
            const [next, keys] = await redis.scan(ccursor, { match: 'counter:country:*', count: 100 });
            ccursor = Number(next);
            countryKeys.push(...(keys as string[]));
        } while (ccursor !== 0);

        const countryCounts = countryKeys.length > 0
            ? await Promise.all(countryKeys.map(k => redis.get<number>(k)))
            : [];

        const byCountry = countryKeys
            .map((k, i) => ({ country: k.replace('counter:country:', ''), count: countryCounts[i] ?? 0 }))
            .sort((a, b) => b.count - a.count);

        const recent: VisitRecord[] = (recentRaw as string[])
            .map(r => { try { return JSON.parse(r); } catch { return null; } })
            .filter(Boolean);

        return {
            totalViews: total ?? 0,
            uniqueIps: uniqueCount ?? 0,
            byPage,
            byCountry,
            recent,
            usingRedis: true,
        };
    }

    // In-memory fallback stats
    const byPageMap: Record<string, number> = {};
    const ipSet = new Set<string>();
    for (const v of memStore) {
        byPageMap[v.path] = (byPageMap[v.path] ?? 0) + 1;
        ipSet.add(v.ip);
    }
    return {
        totalViews: memStore.length,
        uniqueIps: ipSet.size,
        byPage: Object.entries(byPageMap)
            .map(([page, count]) => ({ page, count }))
            .sort((a, b) => b.count - a.count),
        byCountry: [],
        recent: memStore.slice(0, 50),
        usingRedis: false,
    };
}
