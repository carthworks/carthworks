'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeSelector() {
    const { theme, setTheme } = useTheme();

    const themes = [
        { id: 'minimalist', icon: 'M', label: 'Minimalist' },
        { id: 'glassmorphism', icon: 'G', label: 'Glass' },
        { id: 'claymorphism', icon: 'C', label: 'Clay' },
    ];

    return (
        <div className="fixed top-20 right-6 z-50">
            <div className={`rounded-lg shadow-lg p-2 ${theme === 'glassmorphism'
                ? 'glass-card'
                : theme === 'claymorphism'
                    ? 'clay-card'
                    : 'bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg border border-zinc-200 dark:border-zinc-800'
                }`}>
                <div className="flex flex-col gap-1">
                    {themes.map((themeOption) => (
                        <button
                            key={themeOption.id}
                            onClick={() => setTheme(themeOption.id as any)}
                            className={`w-10 h-10 rounded-lg text-sm font-bold transition-all flex items-center justify-center ${theme === themeOption.id
                                ? theme === 'glassmorphism'
                                    ? 'bg-white/20 scale-110'
                                    : theme === 'claymorphism'
                                        ? 'clay-card scale-110'
                                        : 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 scale-110'
                                : theme === 'glassmorphism'
                                    ? 'hover:bg-white/10'
                                    : theme === 'claymorphism'
                                        ? 'hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                        : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                }`}
                            title={themeOption.label}
                            aria-label={themeOption.label}
                        >
                            {themeOption.icon}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
