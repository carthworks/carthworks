export const ANALYTICS_COOKIE_NAME = 'cw_analytics_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

function getSecret(): string {
    return (process.env.ANALYTICS_SECRET ?? '').trim();
}

export function isAnalyticsSecretConfigured(): boolean {
    return getSecret().length > 0;
}

async function hmacHex(secret: string, message: string): Promise<string> {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw',
        enc.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
    return Array.from(new Uint8Array(sig))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}

function constantTimeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) {
        diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return diff === 0;
}

export async function verifyPassword(input: string): Promise<boolean> {
    const secret = getSecret();
    if (!secret || !input) return false;
    // Compare HMAC digests of equal length to avoid timing leaks
    const [a, b] = await Promise.all([
        hmacHex(secret, `pw:${input}`),
        hmacHex(secret, `pw:${secret}`),
    ]);
    return constantTimeEqual(a, b);
}

export async function createSessionToken(): Promise<string> {
    const secret = getSecret();
    if (!secret) throw new Error('ANALYTICS_SECRET is not configured');
    const exp = Date.now() + SESSION_TTL_MS;
    const payload = `v1.${exp}`;
    const sig = await hmacHex(secret, payload);
    return `${payload}.${sig}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
    const secret = getSecret();
    if (!secret || !token) return false;
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const [version, expStr, sig] = parts;
    if (version !== 'v1') return false;
    const exp = Number(expStr);
    if (!Number.isFinite(exp) || Date.now() > exp) return false;
    const expected = await hmacHex(secret, `${version}.${expStr}`);
    return constantTimeEqual(sig, expected);
}
