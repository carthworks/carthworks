import { NextRequest, NextResponse } from 'next/server';
import {
    detectBrowser,
    detectDevice,
    detectOS,
    extractIp,
    extractSource,
    recordVisit,
} from '@/lib/analytics';

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

        const ua = (req.headers.get('user-agent') ?? '').slice(0, 300);

        // Silently ignore bots hitting the tracker
        const botPattern = /bot|crawl|spider|slurp|headless/i;
        if (botPattern.test(ua)) {
            return NextResponse.json({ ok: true, skipped: 'bot' });
        }

        const ip = extractIp(req);
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
