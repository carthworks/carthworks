import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 text-indigo-400 text-3xl font-extrabold shadow-2xl">
                    404
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
                    Page Not Found
                </h1>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                    The page you are looking for doesn&apos;t exist, has been moved, or requires specific access privileges.
                </p>
                <div className="pt-4 flex justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-100 text-zinc-900 font-semibold text-sm hover:bg-white transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Return to Portfolio
                    </Link>
                </div>
            </div>
        </main>
    );
}
