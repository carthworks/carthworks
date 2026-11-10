import Image from 'next/image';

export default function Loading() {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="Loading content"
            className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl"
        >
            {/* Top glowing progress line */}
            <div className="fixed top-0 left-0 right-0 h-[3px] bg-zinc-200 dark:bg-zinc-800 overflow-hidden z-[10000]">
                <div className="h-full w-2/3 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 animate-pulse shadow-[0_0_12px_rgba(99,102,241,0.8)]" />
            </div>

            {/* Ambient background glow */}
            <div
                aria-hidden="true"
                className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-500/20 via-purple-500/15 to-transparent blur-3xl animate-pulse pointer-events-none"
            />

            {/* Central Brand Card */}
            <div className="relative flex flex-col items-center text-center px-6">
                <div className="relative mb-5 flex items-center justify-center">
                    <div
                        aria-hidden="true"
                        className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 blur-sm animate-spin [animation-duration:4s]"
                    />
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl flex items-center justify-center">
                        <Image
                            src="/kt_logo_github_sized.png"
                            alt="KT Logo"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 antialiased">
                    Karthikeyan T
                </h2>
                <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-wide antialiased">
                    Loading portfolio...
                </p>

                <div className="mt-6 w-36 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div className="h-full w-1/2 rounded-full bg-zinc-900 dark:bg-zinc-100 animate-pulse" />
                </div>
            </div>
        </div>
    );
}

