import type { NextRequest } from 'next/server';

// ── Types ──────────────────────────────────────────────────────────────────
export interface VisitRecord {
    ip: string;          // anonymised — last IPv4 octet zeroed
    path: string;
    referrer: string;
    source?: string;     // normalized source: utm_source, referrer host, or 'Direct'
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    ua: string;
    browser?: string;
    os?: string;
    device?: 'mobile' | 'tablet' | 'desktop' | 'bot';
    language?: string;
    screen?: string;
    timezone?: string;
    visitorId?: string;
    returning?: boolean;
    ts: number;          // unix ms
    country?: string;
    region?: string;
    city?: string;
}

export interface AnalyticsStats {
    totalViews: number;
    uniqueVisitors: number;
    uniqueIps: number;
    byPage: Array<{ page: string; count: number }>;
    byCountry: Array<{ country: string; count: number }>;
    byCity: Array<{ city: string; country?: string; count: number }>;
    bySource: Array<{ source: string; count: number }>;
    byDevice: Array<{ device: string; count: number }>;
    byBrowser: Array<{ browser: string; count: number }>;
    byOS: Array<{ os: string; count: number }>;
    recent: VisitRecord[];
    usingRedis: boolean;
}

// ── IP anonymisation ───────────────────────────────────────────────────────
export function anonymiseIp(raw: string): string {
    if (!raw) return 'unknown';
    const ip = raw.split(',')[0].trim();
    const v4 = ip.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3})\.\d{1,3}$/);
    if (v4) return `${v4[1]}.0`;
    if (ip.includes(':')) return ip.split(':').slice(0, 4).join(':') + '::';
    return 'unknown';
}

export function extractIp(req: NextRequest): string {
    const forwarded = req.headers.get('x-forwarded-for');
    const real = req.headers.get('x-real-ip');
    const raw = forwarded ?? real ?? '127.0.0.1';
    return anonymiseIp(raw);
}

// ── User-Agent & Source parsing (Edge-compatible, zero deps) ───────────────
export function detectDevice(ua: string): 'mobile' | 'tablet' | 'desktop' | 'bot' {
    const u = ua.toLowerCase();
    if (/bot|crawl|spider|slurp|facebookexternalhit|linkedinbot|headless/.test(u)) return 'bot';
    if (/tablet|ipad|playbook|silk/.test(u)) return 'tablet';
    if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/.test(u)) return 'mobile';
    return 'desktop';
}

export function detectBrowser(ua: string): string {
    if (!ua) return 'Unknown';
    if (/edg\//i.test(ua)) return 'Edge';
    if (/opr\/|opera/i.test(ua)) return 'Opera';
    if (/samsungbrowser/i.test(ua)) return 'Samsung';
    if (/firefox|fxios/i.test(ua)) return 'Firefox';
    if (/crios|chrome/i.test(ua) && !/edg\//i.test(ua)) return 'Chrome';
    if (/safari/i.test(ua) && !/chrome|crios|android/i.test(ua)) return 'Safari';
    return 'Other';
}

export function detectOS(ua: string): string {
    if (!ua) return 'Unknown';
    if (/iphone|ipad|ipod/i.test(ua)) return 'iOS';
    if (/android/i.test(ua)) return 'Android';
    if (/windows/i.test(ua)) return 'Windows';
    if (/mac os x|macintosh/i.test(ua)) return 'macOS';
    if (/cros/i.test(ua)) return 'ChromeOS';
    if (/linux/i.test(ua)) return 'Linux';
    return 'Other';
}

export function extractSource(referrer: string, utmSource?: string): string {
    if (utmSource && utmSource.trim()) {
        return utmSource.trim().toLowerCase().slice(0, 64);
    }
    if (!referrer || !referrer.trim()) return 'Direct';
    try {
        const url = new URL(referrer);
        const host = url.hostname.replace(/^www\./i, '').toLowerCase();
        if (!host || host === 'localhost' || host === 'carthworks.dev') {
            return 'Direct';
        }
        return host;
    } catch {
        return 'Direct';
    }
}

function hydrateRecord(v: VisitRecord): VisitRecord {
    return {
        ...v,
        device: v.device ?? detectDevice(v.ua ?? ''),
        browser: v.browser ?? detectBrowser(v.ua ?? ''),
        os: v.os ?? detectOS(v.ua ?? ''),
        source: v.source ?? extractSource(v.referrer ?? '', v.utmSource),
    };
}

function tally<T extends string>(items: T[]): Array<{ key: T; count: number }> {
    const map = new Map<T, number>();
    for (const item of items) {
        map.set(item, (map.get(item) ?? 0) + 1);
    }
    return Array.from(map.entries())
        .map(([key, count]) => ({ key, count }))
        .sort((a, b) => b.count - a.count);
}

// ── In-memory fallback (local dev without Redis env vars) ─────────────────
const memStore: VisitRecord[] = [];
const memVisitors = new Set<string>();

// ── Redis client (lazy — doesn't crash when env vars are absent) ───────────
async function getRedis() {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) return null;
    const { Redis } = await import('@upstash/redis');
    return new Redis({ url, token });
}

// ── Public API ─────────────────────────────────────────────────────────────
export async function recordVisit(rawVisit: VisitRecord): Promise<void> {
    const visit = hydrateRecord(rawVisit);
    const redis = await getRedis();

    if (redis) {
        // Determine returning status before persisting
        if (visit.visitorId) {
            const added = await redis.sadd('visitors:unique', visit.visitorId);
            visit.returning = added === 0;
        } else {
            const added = await redis.sadd('ips:unique', visit.ip);
            visit.returning = added === 0;
        }

        const key = `visit:${visit.ts}:${Math.random().toString(36).slice(2)}`;
        const ops: Promise<unknown>[] = [
            redis.set(key, JSON.stringify(visit), { ex: 60 * 60 * 24 * 90 }),
            redis.incr('counter:total'),
            redis.incr(`counter:page:${visit.path}`),
            redis.incr(`counter:source:${visit.source ?? 'Direct'}`),
            redis.incr(`counter:device:${visit.device ?? 'desktop'}`),
            redis.lpush('visits:recent', JSON.stringify(visit)),
            redis.ltrim('visits:recent', 0, 199),
            redis.sadd('ips:unique', visit.ip),
        ];
        if (visit.country) {
            ops.push(redis.incr(`counter:country:${visit.country}`));
        }
        await Promise.all(ops);
    } else {
        const identity = visit.visitorId ?? visit.ip;
        visit.returning = memVisitors.has(identity);
        memVisitors.add(identity);
        memStore.unshift(visit);
        if (memStore.length > 200) memStore.pop();
    }
}

async function scanCounterPrefix(
    redis: NonNullable<Awaited<ReturnType<typeof getRedis>>>,
    prefix: string
): Promise<Array<{ key: string; count: number }>> {
    const keys: string[] = [];
    let cursor = 0;
    do {
        const [next, batch] = await redis.scan(cursor, { match: `${prefix}*`, count: 100 });
        cursor = Number(next);
        keys.push(...(batch as string[]));
    } while (cursor !== 0);

    if (keys.length === 0) return [];
    const counts = await Promise.all(keys.map((k) => redis.get<number>(k)));
    return keys
        .map((k, i) => ({ key: k.slice(prefix.length), count: counts[i] ?? 0 }))
        .sort((a, b) => b.count - a.count);
}

function aggregateFromRecent(recent: VisitRecord[]) {
    const byBrowser = tally(recent.map((v) => v.browser ?? 'Unknown')).map(({ key, count }) => ({
        browser: key,
        count,
    }));
    const byOS = tally(recent.map((v) => v.os ?? 'Unknown')).map(({ key, count }) => ({
        os: key,
        count,
    }));

    const cityMap = new Map<string, { city: string; country?: string; count: number }>();
    for (const v of recent) {
        if (!v.city) continue;
        const k = `${v.city}|${v.country ?? ''}`;
        const existing = cityMap.get(k);
        if (existing) {
            existing.count += 1;
        } else {
            cityMap.set(k, { city: v.city, country: v.country, count: 1 });
        }
    }
    const byCity = Array.from(cityMap.values()).sort((a, b) => b.count - a.count);

    return { byBrowser, byOS, byCity };
}

export async function getStats(): Promise<AnalyticsStats> {
    const redis = await getRedis();

    if (redis) {
        const [total, uniqueIpCount, uniqueVisitorCount, recentRaw, pageRows, countryRows, sourceRows, deviceRows] =
            await Promise.all([
                redis.get<number>('counter:total'),
                redis.scard('ips:unique'),
                redis.scard('visitors:unique'),
                redis.lrange('visits:recent', 0, 99),
                scanCounterPrefix(redis, 'counter:page:'),
                scanCounterPrefix(redis, 'counter:country:'),
                scanCounterPrefix(redis, 'counter:source:'),
                scanCounterPrefix(redis, 'counter:device:'),
            ]);

        const recent: VisitRecord[] = (recentRaw as unknown[])
            .map((r) => {
                try {
                    const parsed = typeof r === 'string' ? JSON.parse(r) : r;
                    return parsed ? hydrateRecord(parsed as VisitRecord) : null;
                } catch {
                    return null;
                }
            })
            .filter((v): v is VisitRecord => Boolean(v));

        const { byBrowser, byOS, byCity } = aggregateFromRecent(recent);

        const bySource =
            sourceRows.length > 0
                ? sourceRows.map(({ key, count }) => ({ source: key, count }))
                : tally(recent.map((v) => v.source ?? 'Direct')).map(({ key, count }) => ({
                      source: key,
                      count,
                  }));

        const byDevice =
            deviceRows.length > 0
                ? deviceRows.map(({ key, count }) => ({ device: key, count }))
                : tally(recent.map((v) => v.device ?? 'desktop')).map(({ key, count }) => ({
                      device: key,
                      count,
                  }));

        return {
            totalViews: total ?? 0,
            uniqueVisitors: Math.max(uniqueVisitorCount ?? 0, uniqueIpCount ?? 0),
            uniqueIps: uniqueIpCount ?? 0,
            byPage: pageRows.map(({ key, count }) => ({ page: key, count })),
            byCountry: countryRows.map(({ key, count }) => ({ country: key, count })),
            byCity,
            bySource,
            byDevice,
            byBrowser,
            byOS,
            recent,
            usingRedis: true,
        };
    }

    // In-memory fallback stats
    const recent = memStore.slice(0, 100).map(hydrateRecord);
    const ipSet = new Set<string>();
    const visitorSet = new Set<string>();
    for (const v of memStore) {
        ipSet.add(v.ip);
        visitorSet.add(v.visitorId ?? v.ip);
    }

    const { byBrowser, byOS, byCity } = aggregateFromRecent(recent);

    return {
        totalViews: memStore.length,
        uniqueVisitors: visitorSet.size,
        uniqueIps: ipSet.size,
        byPage: tally(memStore.map((v) => v.path)).map(({ key, count }) => ({ page: key, count })),
        byCountry: tally(memStore.map((v) => v.country).filter((c): c is string => Boolean(c))).map(
            ({ key, count }) => ({ country: key, count })
        ),
        byCity,
        bySource: tally(recent.map((v) => v.source ?? 'Direct')).map(({ key, count }) => ({
            source: key,
            count,
        })),
        byDevice: tally(recent.map((v) => v.device ?? 'desktop')).map(({ key, count }) => ({
            device: key,
            count,
        })),
        byBrowser,
        byOS,
        recent,
        usingRedis: false,
    };
}
