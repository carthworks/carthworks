import { NextRequest, NextResponse } from 'next/server';
import {
    ANALYTICS_COOKIE_NAME,
    createSessionToken,
    isAnalyticsSecretConfigured,
    verifyPassword,
} from '@/lib/analytics-auth';

export async function POST(req: NextRequest) {
    if (!isAnalyticsSecretConfigured()) {
        return NextResponse.json(
            { error: 'ANALYTICS_SECRET is not configured on the server.' },
            { status: 503 }
        );
    }

    const body = (await req.json().catch(() => ({}))) as { password?: string };
    const password = typeof body.password === 'string' ? body.password : '';

    const valid = await verifyPassword(password);
    if (!valid) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = await createSessionToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ANALYTICS_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24,
    });
    return res;
}

export async function DELETE() {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ANALYTICS_COOKIE_NAME, '', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 0,
    });
    return res;
}
