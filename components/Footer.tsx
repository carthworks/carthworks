'use client';

import { personalInfo } from '@/lib/data';
import { useTheme } from '@/contexts/ThemeContext';

export default function Footer() {
    const { theme } = useTheme();
    const currentYear = new Date().getFullYear();

    const getSectionClassName = () => {
        if (theme === 'glassmorphism') {
            return 'py-12 px-6 glass-section border-t border-white/20';
        } else if (theme === 'claymorphism') {
            return 'py-12 px-6 border-t border-zinc-300 dark:border-zinc-700';
        }
        return 'py-12 px-6 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800';
    };

    return (
        <footer className={getSectionClassName()}>
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <p className={`font-semibold mb-1 ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'
                            }`}>
                            {personalInfo.name}
                        </p>
                        <p className={`text-sm ${theme === 'glassmorphism' ? 'text-white/80' : 'text-zinc-600 dark:text-zinc-400'
                            }`}>
                            {personalInfo.title}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-6 justify-center text-sm">
                        <a
                            href={`https://${personalInfo.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`transition-colors ${theme === 'glassmorphism'
                                    ? 'text-white/80 hover:text-white'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                                }`}
                        >
                            GitHub
                        </a>
                        <a
                            href={`https://${personalInfo.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`transition-colors ${theme === 'glassmorphism'
                                    ? 'text-white/80 hover:text-white'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                                }`}
                        >
                            LinkedIn
                        </a>
                        <a
                            href={`https://${personalInfo.behance}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`transition-colors ${theme === 'glassmorphism'
                                    ? 'text-white/80 hover:text-white'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                                }`}
                        >
                            Behance
                        </a>
                        <a
                            href={`https://${personalInfo.flickr}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`transition-colors ${theme === 'glassmorphism'
                                    ? 'text-white/80 hover:text-white'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                                }`}
                        >
                            Flickr
                        </a>
                    </div>
                </div>

                <div className={`mt-8 pt-8 text-center border-t ${theme === 'glassmorphism' ? 'border-white/20' : 'border-zinc-200 dark:border-zinc-800'
                    }`}>
                    <p className={`text-sm ${theme === 'glassmorphism' ? 'text-white/60' : 'text-zinc-500 dark:text-zinc-500'
                        }`}>
                        © {currentYear} {personalInfo.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
