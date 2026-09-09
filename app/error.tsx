'use client';

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log to console or telemetry (without exposing secrets)
        console.error('Application runtime error caught:', error.message);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-950/40 border border-red-800/60 text-red-400 text-2xl font-bold shadow-2xl">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
                    Something went wrong
                </h1>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    An unexpected error occurred while loading this view. You can try reloading or return to the main page.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => reset()}
                        className="px-5 py-2.5 rounded-lg bg-zinc-100 text-zinc-900 font-semibold text-sm hover:bg-white transition-all shadow-md"
                    >
                        Try again
                    </button>
                    <a
                        href="/"
                        className="px-5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-sm hover:bg-zinc-800 transition-all"
                    >
                        Go to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
