'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeSelector() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="fixed top-6 right-6 z-50">
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg p-4">
                <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-3">Theme</p>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => setTheme('minimalist')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${theme === 'minimalist'
                                ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900'
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                            }`}
                    >
                        Minimalist
                    </button>
                    <button
                        onClick={() => setTheme('glassmorphism')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${theme === 'glassmorphism'
                                ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900'
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                            }`}
                    >
                        Glass
                    </button>
                    <button
                        onClick={() => setTheme('claymorphism')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${theme === 'claymorphism'
                                ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900'
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                            }`}
                    >
                        Clay
                    </button>
                </div>
            </div>
        </div>
    );
}
