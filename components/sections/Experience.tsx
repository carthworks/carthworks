'use client';

import { experience } from '@/lib/data';
import { useTheme } from '@/contexts/ThemeContext';

export default function Experience() {
    const { theme } = useTheme();

    const getSectionClassName = () => {
        if (theme === 'glassmorphism') {
            return 'py-24 px-6 glass-section';
        } else if (theme === 'claymorphism') {
            return 'py-24 px-6';
        }
        return 'py-24 px-6 bg-white dark:bg-zinc-900';
    };

    const getCardClassName = () => {
        const baseClasses = 'p-6 rounded-lg transition-all';

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
                <h2 className={`text-4xl lg:text-5xl font-bold mb-4 ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'
                    }`}>
                    Experience
                </h2>
                <p className={`text-lg mb-12 max-w-2xl ${theme === 'glassmorphism' ? 'text-white/90' : 'text-zinc-600 dark:text-zinc-400'
                    }`}>
                    20+ years of engineering excellence across AI, SaaS, and full-stack development
                </p>

                <div className="space-y-8">
                    {experience.map((job, index) => (
                        <div
                            key={index}
                            className={`group relative pl-8 pb-8 border-l-2 last:pb-0 transition-colors ${getBorderColor()}`}
                        >
                            {/* Timeline dot */}
                            <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full transition-colors ${getDotColor()}`} />

                            <div className={getCardClassName()}>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                    <h3 className={`text-xl font-semibold ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'
                                        }`}>
                                        {job.company}
                                    </h3>
                                    <span className={`text-sm font-mono ${theme === 'glassmorphism' ? 'text-white/70' : 'text-zinc-500 dark:text-zinc-400'
                                        }`}>
                                        {job.period}
                                    </span>
                                </div>
                                <p className={theme === 'glassmorphism' ? 'text-white/90' : 'text-zinc-700 dark:text-zinc-300'}>
                                    {job.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
