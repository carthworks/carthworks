'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { personalInfo } from '@/lib/data';

export default function PageLoader() {
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(true);
    const [progress, setProgress] = useState(18);
    const pathname = usePathname();

    useEffect(() => {
        // Reset loader on mount or pathname change
        setLoading(true);
        setVisible(true);
        setProgress(24);

        const t1 = setTimeout(() => setProgress(52), 120);
        const t2 = setTimeout(() => setProgress(78), 280);
        const t3 = setTimeout(() => setProgress(92), 480);

        const finish = () => {
            setProgress(100);
            const fadeTimer = setTimeout(() => {
                setLoading(false);
                const unmountTimer = setTimeout(() => setVisible(false), 500);
                return () => clearTimeout(unmountTimer);
            }, 260);
            return () => clearTimeout(fadeTimer);
        };

        let minTimer: ReturnType<typeof setTimeout> | undefined;

        if (typeof document !== 'undefined') {
            if (document.readyState === 'complete') {
                minTimer = setTimeout(finish, 500);
            } else {
                const onLoad = () => {
                    minTimer = setTimeout(finish, 400);
                };
                window.addEventListener('load', onLoad);
                return () => {
                    clearTimeout(t1);
                    clearTimeout(t2);
                    clearTimeout(t3);
                    if (minTimer) clearTimeout(minTimer);
                    window.removeEventListener('load', onLoad);
                };
            }
        }

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            if (minTimer) clearTimeout(minTimer);
        };
    }, [pathname]);

    if (!visible) return null;

    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="Loading page"
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-500 ease-out ${
                loading
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none scale-102 backdrop-blur-none'
            } bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl`}
        >
            {/* Top glowing progress line */}
            <div className="fixed top-0 left-0 right-0 h-[3px] bg-zinc-200 dark:bg-zinc-800 overflow-hidden z-[10000]">
                <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(99,102,241,0.8)]"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Ambient background glow */}
            <div
                aria-hidden="true"
                className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-500/20 via-purple-500/15 to-transparent blur-3xl animate-pulse pointer-events-none"
            />

            {/* Central Brand Card */}
            <div className="relative flex flex-col items-center text-center px-6">
                {/* Logo with rotating animated gradient border */}
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

                {/* Identity */}
                <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 antialiased">
                    {personalInfo.name}
                </h2>
                <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-wide antialiased">
                    {personalInfo.title.split('|')[0]?.trim() || 'Senior Lead Software Engineer'}
                </p>

                {/* Mini loading track */}
                <div className="mt-6 w-36 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

