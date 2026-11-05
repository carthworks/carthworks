'use client';

import { experience } from '@/lib/data';
import { useTheme } from '@/contexts/ThemeContext';

export default function Experience() {
    const { theme } = useTheme();

    const getSectionClassName = () => {
        if (theme === 'glassmorphism') {
            return 'py-12 px-6 glass-section';
        } else if (theme === 'claymorphism') {
            return 'py-12 px-6';
        }
        return 'py-12 px-6 bg-white dark:bg-zinc-900';
    };

    const getCardClassName = () => {
        const baseClasses = 'px-4 py-3 rounded-lg transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4';

        if (theme === 'glassmorphism') {
            return `${baseClasses} glass-card`;
        } else if (theme === 'claymorphism') {
            return `${baseClasses} clay-card`;
        }
        return `${baseClasses} bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700`;
    };

    const getBorderColor = () => {
        if (theme === 'glassmorphism') return 'border-white/20 hover:border-white/40';
        if (theme === 'claymorphism') return 'border-zinc-300 dark:border-zinc-700';
        return 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600';
    };

    const getDotColor = () => {
        if (theme === 'glassmorphism') return 'bg-white/30 group-hover:bg-white';
        if (theme === 'claymorphism') return 'bg-zinc-400 dark:bg-zinc-600 group-hover:bg-zinc-600 dark:group-hover:bg-zinc-400';
        return 'bg-zinc-300 dark:bg-zinc-700 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-50';
    };

    return (
        <section id="experience" className={getSectionClassName()}>
            <div className="max-w-6xl mx-auto">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                    <div>
                        <h2 className={`text-3xl lg:text-4xl font-bold ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'
                            }`}>
                            Experience
                        </h2>
                        <p className={`mt-1 text-sm ${theme === 'glassmorphism' ? 'text-white/80' : 'text-zinc-600 dark:text-zinc-400'
                            }`}>
                            20+ years of engineering excellence across AI, SaaS, and full-stack development
                        </p>
                    </div>
                </div>

                <div className="space-y-2.5">
                    {experience.map((job, index) => (
                        <div
                            key={index}
                            className={`group relative pl-6 pb-2.5 border-l-2 last:pb-0 transition-colors ${getBorderColor()}`}
                        >
                            {/* Timeline dot */}
                            <div className={`absolute left-[-6px] top-3.5 w-2.5 h-2.5 rounded-full transition-colors ${getDotColor()}`} />

                            <div className={getCardClassName()}>
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 min-w-0">
                                    <h3 className={`text-base font-semibold shrink-0 ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'
                                        }`}>
                                        {job.company}
                                    </h3>
                                    <span className={`hidden sm:inline text-xs ${theme === 'glassmorphism' ? 'text-white/40' : 'text-zinc-400'}`}>
                                        •
                                    </span>
                                    <p className={`text-sm truncate ${theme === 'glassmorphism' ? 'text-white/90' : 'text-zinc-600 dark:text-zinc-300'}`}>
                                        {job.role}
                                    </p>
                                </div>
                                <span className={`text-xs font-mono shrink-0 ${theme === 'glassmorphism' ? 'text-white/70' : 'text-zinc-500 dark:text-zinc-400'
                                    }`}>
                                    {job.period}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
