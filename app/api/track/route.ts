import { NextRequest, NextResponse } from 'next/server';
import {
    anonymiseIp,
    detectBrowser,
    detectDevice,
    detectOS,
    extractRawIp,
    extractSource,
    isIgnoredIp,
    recordVisit,
} from '@/lib/analytics';
import { ANALYTICS_COOKIE_NAME, verifySessionToken } from '@/lib/analytics-auth';

export const runtime = 'edge';

function cleanStr(val: unknown, maxLen: number): string | undefined {
    if (typeof val !== 'string') return undefined;
    const trimmed = val.trim();
    return trimmed ? trimmed.slice(0, maxLen) : undefined;
}

function safeDecodeHeader(val: string | null): string | undefined {
    if (!val) return undefined;
    try {
        return decodeURIComponent(val).slice(0, 80);
    } catch {
        return val.slice(0, 80);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
        const path = cleanStr(body.path, 200) ?? '/';

        // Never record visits to the private analytics dashboard or API routes
        if (path.startsWith('/analytics') || path.startsWith('/api')) {
            return NextResponse.json({ ok: true, skipped: 'private' });
        }

        // Skip localhost requests
        const host = (req.headers.get('host') ?? '').toLowerCase();
        if (host.startsWith('localhost') || host.startsWith('127.0.0.1') || host.startsWith('[::1]')) {
            return NextResponse.json({ ok: true, skipped: 'localhost' });
        }

        // Skip owner's authenticated browser session
        const sessionToken = req.cookies.get(ANALYTICS_COOKIE_NAME)?.value;
        if (sessionToken && (await verifySessionToken(sessionToken))) {
            return NextResponse.json({ ok: true, skipped: 'owner' });
        }

        const rawIp = extractRawIp(req);
        if (isIgnoredIp(rawIp)) {
            return NextResponse.json({ ok: true, skipped: 'ignored-ip' });
        }

        const ua = (req.headers.get('user-agent') ?? '').slice(0, 300);

        // Silently ignore bots hitting the tracker
        const botPattern = /bot|crawl|spider|slurp|headless/i;
        if (botPattern.test(ua)) {
            return NextResponse.json({ ok: true, skipped: 'bot' });
        }

        const ip = anonymiseIp(rawIp);
        const referrer = cleanStr(body.referrer, 300) ?? '';
        const utmSource = cleanStr(body.utmSource, 64);
        const utmMedium = cleanStr(body.utmMedium, 64);
        const utmCampaign = cleanStr(body.utmCampaign, 100);
        const screen = cleanStr(body.screen, 24);
        const visitorId = cleanStr(body.visitorId, 64);

        const acceptLang = req.headers.get('accept-language')?.split(',')[0]?.trim();
        const language = cleanStr(body.language, 32) ?? (acceptLang ? acceptLang.slice(0, 32) : undefined);

        const country =
            req.headers.get('x-vercel-ip-country') ??
            req.headers.get('cf-ipcountry') ??
            undefined;
        const region = safeDecodeHeader(req.headers.get('x-vercel-ip-country-region'));
        const city = safeDecodeHeader(req.headers.get('x-vercel-ip-city'));
        const timezone =
            cleanStr(body.timezone, 64) ??
            safeDecodeHeader(req.headers.get('x-vercel-ip-timezone'));

        await recordVisit({
            ip,
            path,
            referrer,
            source: extractSource(referrer, utmSource),
            utmSource,
            utmMedium,
            utmCampaign,
            ua,
            device: detectDevice(ua),
            browser: detectBrowser(ua),
            os: detectOS(ua),
            language,
            screen,
            timezone,
            visitorId,
            ts: Date.now(),
            country,
            region,
            city,
        });

        return NextResponse.json({ ok: true });
    } catch {
        // Never let analytics errors affect the visitor experience
        return NextResponse.json({ ok: false }, { status: 200 });
    }
}
