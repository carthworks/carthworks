'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface AnalyticsLoginProps {
    configured: boolean;
}

export default function AnalyticsLogin({ configured }: AnalyticsLoginProps) {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!password.trim() || submitting) return;
        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch('/api/analytics/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            if (!res.ok) {
                const data = (await res.json().catch(() => ({}))) as { error?: string };
                setError(data.error ?? 'Access denied');
                setSubmitting(false);
                return;
            }
            setPassword('');
            router.refresh();
        } catch {
            setError('Unable to verify right now');
            setSubmitting(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#09090d] text-zinc-100 px-4">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur">
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                        <svg
                            className="w-5 h-5 text-zinc-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.8}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-lg font-semibold tracking-tight text-zinc-100">
                        Restricted Access
                    </h1>
                    <p className="text-xs text-zinc-500 mt-1">
                        Enter passphrase to continue
                    </p>
                </div>

                {!configured ? (
                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300 text-center">
                        Set <code className="font-mono">ANALYTICS_SECRET</code> in your environment to enable access.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="analytics-password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="analytics-password"
                                type="password"
                                autoFocus
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Passphrase"
                                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:border-indigo-500/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            />
                        </div>

                        {error && (
                            <p role="alert" className="text-xs text-rose-400 text-center">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={submitting || !password.trim()}
                            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-3 text-sm font-medium text-white transition-colors"
                        >
                            {submitting ? 'Verifying...' : 'Unlock'}
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
}
