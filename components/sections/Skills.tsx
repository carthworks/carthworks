'use client';

import { skills } from '@/lib/data';
import { useTheme } from '@/contexts/ThemeContext';

export default function Skills() {
    const { theme } = useTheme();

    const getSectionClassName = () => {
        if (theme === 'glassmorphism') {
            return 'py-24 px-6 glass-section';
        } else if (theme === 'claymorphism') {
            return 'py-24 px-6';
        }
        return 'py-24 px-6 bg-zinc-50 dark:bg-zinc-950';
    };

    const getCardClassName = () => {
        const baseClasses = 'p-6 rounded-lg transition-all duration-200';

        if (theme === 'glassmorphism') {
            return `${baseClasses} glass-card text-white`;
        } else if (theme === 'claymorphism') {
            return `${baseClasses} clay-card`;
        }
        return `${baseClasses} bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg`;
    };

    return (
        <section id="skills" className={getSectionClassName()}>
            <div className="max-w-6xl mx-auto">
                <h2 className={`text-4xl lg:text-5xl font-bold mb-4 ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'
                    }`}>
                    Core Competencies
                </h2>
                <p className={`text-lg mb-12 max-w-2xl ${theme === 'glassmorphism' ? 'text-white/90' : 'text-zinc-600 dark:text-zinc-400'
                    }`}>
                    Technical expertise across the full stack of modern software development
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(skills).map(([category, items]) => (
                        <div key={category} className={getCardClassName()}>
                            <h3 className={`text-lg font-semibold mb-4 pb-3 border-b ${theme === 'glassmorphism'
                                    ? 'text-white border-white/20'
                                    : 'text-zinc-900 dark:text-zinc-50 border-zinc-200 dark:border-zinc-800'
                                }`}>
                                {category}
                            </h3>
                            <ul className="space-y-2">
                                {items.map((skill, index) => (
                                    <li
                                        key={index}
                                        className={`text-sm flex items-start gap-2 ${theme === 'glassmorphism' ? 'text-white/90' : 'text-zinc-700 dark:text-zinc-300'
                                            }`}
                                    >
                                        <span className={theme === 'glassmorphism' ? 'text-white/60 mt-1.5' : 'text-zinc-400 dark:text-zinc-600 mt-1.5'}>•</span>
                                        <span>{skill}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
