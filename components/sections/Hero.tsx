'use client';

import Image from 'next/image';
import { personalInfo, portfolioStats } from '@/lib/data';
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
        const baseClasses = 'px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200';

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

    const handleHeroNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        setTimeout(() => {
            const targetId = href.replace('#', '');

            // Find visible element (handling duplicate IDs)
            const elements = document.querySelectorAll(`#${targetId}`);
            let targetElement: HTMLElement | null = null;

            for (let i = 0; i < elements.length; i++) {
                const el = elements[i] as HTMLElement;
                if (el.offsetParent !== null) {
                    targetElement = el;
                    break;
                }
            }

            if (!targetElement) return;

            const scrollContainer = document.getElementById('content-scroll');
            const isDesktop = scrollContainer && scrollContainer.offsetParent !== null;

            if (isDesktop && scrollContainer) {
                if (scrollContainer.contains(targetElement)) {
                    const containerRect = scrollContainer.getBoundingClientRect();
                    const targetRect = targetElement.getBoundingClientRect();
                    const scrollTop = scrollContainer.scrollTop;
                    const offsetTop = targetRect.top - containerRect.top + scrollTop;

                    scrollContainer.scrollTo({
                        top: offsetTop - 40,
                        behavior: 'smooth'
                    });
                }
            } else {
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 50);
    };

    return (
        <section id="hero" className={getSectionClassName()}>
            <div className="w-full h-full flex items-center justify-center px-4 lg:px-6">
                <div className="w-full max-w-sm">
                    {/* Logo */}
                    <div className="flex justify-center mb-4">
                        <div className={`relative w-24 h-24 rounded-xl overflow-hidden shadow-xl transition-transform hover:scale-105 ${theme === 'glassmorphism'
                            ? 'border-2 border-white/30'
                            : theme === 'claymorphism'
                                ? 'clay-card'
                                : 'border-2 border-zinc-200 dark:border-zinc-800'
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

                    {/* Text Content */}
                    <div className="text-center space-y-3">
                        <h1 className={`text-xl lg:text-2xl font-bold tracking-tight ${getTextColor()}`}>
                            {personalInfo.name}
                        </h1>

                        <p className={`text-xs lg:text-sm font-medium leading-snug ${getSubTextColor()}`}>
                            {personalInfo.title}
                        </p>

                        {/* Divider */}
                        <div className={`w-12 h-0.5 mx-auto ${theme === 'glassmorphism'
                            ? 'bg-white/30'
                            : 'bg-zinc-300 dark:bg-zinc-700'
                            }`} />

                        <p className={`text-md leading-relaxed line-clamp-9 ${theme === 'glassmorphism' ? 'text-white/75' : 'text-zinc-600 dark:text-zinc-400'
                            }`}>
                            {personalInfo.bio}
                        </p>

                        <div className="grid grid-cols-2 gap-2 pt-2">
                            {portfolioStats.map((stat) => (
                                <div
                                    key={`${stat.value}-${stat.label}`}
                                    className={`rounded-lg px-3 py-2 text-left ${theme === 'glassmorphism'
                                        ? 'bg-white/10 border border-white/10'
                                        : theme === 'claymorphism'
                                            ? 'clay-card'
                                            : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800'
                                        }`}
                                >
                                    <div className={`text-sm font-bold ${getTextColor()}`}>
                                        {stat.value}
                                    </div>
                                    <div className={`text-[11px] leading-snug ${getSubTextColor()}`}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col gap-2 pt-2">
                            <a
                                href="#projects"
                                className={getButtonClassName('primary')}
                                onClick={(e) => handleHeroNavClick(e, '#projects')}
                            >
                                View Projects
                            </a>
                            <a
                                href="#contact"
                                className={getButtonClassName('secondary')}
                                onClick={(e) => handleHeroNavClick(e, '#contact')}
                            >
                                Let's Solve a Real Problem
                            </a>
                        </div>

                        {/* Divider */}
                        <div className={`w-12 h-0.5 mx-auto ${theme === 'glassmorphism'
                            ? 'bg-white/30'
                            : 'bg-zinc-300 dark:bg-zinc-700'
                            }`} />

                        {/* Social Links - Horizontal with Icons */}
                        <div className="flex justify-center gap-4 pt-2">
                            <a
                                href={`https://${personalInfo.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="GitHub"
                                className={`transition-all hover:scale-110 ${theme === 'glassmorphism'
                                    ? 'text-white/80 hover:text-white'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href={`https://${personalInfo.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="LinkedIn"
                                className={`transition-all hover:scale-110 ${theme === 'glassmorphism'
                                    ? 'text-white/80 hover:text-white'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a
                                href={`https://${personalInfo.behance}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Behance"
                                className={`transition-all hover:scale-110 ${theme === 'glassmorphism'
                                    ? 'text-white/80 hover:text-white'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                                </svg>
                            </a>
                            <a
                                href={`mailto:${personalInfo.email}`}
                                title="Email"
                                className={`transition-all hover:scale-110 ${theme === 'glassmorphism'
                                    ? 'text-white/80 hover:text-white'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </a>
                        </div>

                        {/* Download Resume Button */}
                        <div className="flex justify-center pt-4">
                            <a
                                href={personalInfo.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-medium transition-all hover:scale-105 ${theme === 'glassmorphism'
                                    ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                                    : theme === 'claymorphism'
                                        ? 'clay-card text-zinc-900 dark:text-zinc-50'
                                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                    }`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Resume
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
