import { NextRequest, NextResponse } from 'next/server';
import { extractIp, recordVisit } from '@/lib/analytics';

export const runtime = 'edge'; // fast, runs close to user

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));
        const { path = '/', referrer = '' } = body as { path?: string; referrer?: string };

        const ip = extractIp(req);
        const ua = req.headers.get('user-agent') ?? '';
        const country = req.headers.get('x-vercel-ip-country') ?? undefined;

        // Silently ignore bots hitting the tracker
        const botPattern = /bot|crawl|spider|slurp|headless/i;
        if (botPattern.test(ua)) {
            return NextResponse.json({ ok: true, skipped: 'bot' });
        }

        await recordVisit({ ip, path, referrer, ua, ts: Date.now(), country });

        return NextResponse.json({ ok: true });
    } catch {
        // Never let analytics errors affect the visitor experience
        return NextResponse.json({ ok: false }, { status: 200 });
    }
}
