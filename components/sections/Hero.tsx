'use client';

import Image from 'next/image';
import { personalInfo } from '@/lib/data';
import { useTheme } from '@/contexts/ThemeContext';

export default function Hero() {
    const { theme } = useTheme();

    const getSectionClassName = () => {
        if (theme === 'glassmorphism') {
            return 'min-h-screen flex items-center justify-center px-6 py-20 glass-section';
        } else if (theme === 'claymorphism') {
            return 'min-h-screen flex items-center justify-center px-6 py-20';
        }
        return 'min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900';
    };

    const getTextColor = () => {
        if (theme === 'glassmorphism') return 'text-white';
        return 'text-zinc-900 dark:text-zinc-50';
    };

    const getSubTextColor = () => {
        if (theme === 'glassmorphism') return 'text-white/90';
        return 'text-zinc-600 dark:text-zinc-400';
    };

    const getButtonClassName = (variant: 'primary' | 'secondary') => {
        const baseClasses = 'px-8 py-4 rounded-lg font-medium transition-all duration-200';

        if (theme === 'glassmorphism') {
            if (variant === 'primary') {
                return `${baseClasses} bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 shadow-lg hover:shadow-xl`;
            }
            return `${baseClasses} bg-transparent text-white border-2 border-white/50 hover:bg-white/10`;
        } else if (theme === 'claymorphism') {
            if (variant === 'primary') {
                return `${baseClasses} clay-card text-zinc-900 dark:text-zinc-50`;
            }
            return `${baseClasses} clay-card text-zinc-900 dark:text-zinc-50`;
        }

        if (variant === 'primary') {
            return `${baseClasses} bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-lg hover:shadow-xl`;
        }
        return `${baseClasses} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border-2 border-zinc-900 dark:border-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-800`;
    };

    return (
        <section id="hero" className={getSectionClassName()}>
            <div className="max-w-6xl w-full">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <div className={`relative w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden shadow-lg ${theme === 'glassmorphism'
                                ? 'border border-white/20'
                                : theme === 'claymorphism'
                                    ? 'clay-card'
                                    : 'border border-zinc-200 dark:border-zinc-800'
                            }`}>
                            <Image
                                src="/kt_logo_github_sized.png"
                                alt="Karthikeyan T Logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className={`text-5xl lg:text-7xl font-bold tracking-tight mb-4 ${getTextColor()}`}>
                            {personalInfo.name}
                        </h1>
                        <p className={`text-xl lg:text-2xl mb-6 font-light ${getSubTextColor()}`}>
                            {personalInfo.title}
                        </p>
                        <p className={`text-base lg:text-lg mb-8 max-w-3xl leading-relaxed ${theme === 'glassmorphism' ? 'text-white/80' : 'text-zinc-700 dark:text-zinc-300'
                            }`}>
                            {personalInfo.bio}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a href="#projects" className={getButtonClassName('primary')}>
                                View Projects
                            </a>
                            <a href="#contact" className={getButtonClassName('secondary')}>
                                Contact Me
                            </a>
                        </div>

                        {/* Links */}
                        <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start text-sm">
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
                            <span className={theme === 'glassmorphism' ? 'text-white/40' : 'text-zinc-300 dark:text-zinc-700'}>•</span>
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
                            <span className={theme === 'glassmorphism' ? 'text-white/40' : 'text-zinc-300 dark:text-zinc-700'}>•</span>
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
                            <span className={theme === 'glassmorphism' ? 'text-white/40' : 'text-zinc-300 dark:text-zinc-700'}>•</span>
                            <a
                                href={`mailto:${personalInfo.email}`}
                                className={`transition-colors ${theme === 'glassmorphism'
                                        ? 'text-white/80 hover:text-white'
                                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                                    }`}
                            >
                                Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
