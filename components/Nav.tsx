'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

export default function Nav() {
    const { theme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getNavClassName = () => {
        const baseClasses = 'fixed top-0 left-0 right-0 z-40 transition-all duration-300';
        const scrollClasses = isScrolled ? 'py-4' : 'py-6';

        if (theme === 'glassmorphism') {
            return `${baseClasses} ${scrollClasses} ${isScrolled ? 'glass-card mx-6 mt-4 rounded-2xl' : 'bg-transparent'}`;
        } else if (theme === 'claymorphism') {
            return `${baseClasses} ${scrollClasses} ${isScrolled ? 'clay-card mx-4 mt-4' : 'bg-transparent'}`;
        }
        return `${baseClasses} ${scrollClasses} ${isScrolled ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`;
    };

    const getLinkClassName = (isMobile = false) => {
        const baseClasses = isMobile
            ? 'block px-4 py-3 rounded-lg transition-all'
            : 'px-4 py-2 rounded-lg transition-all text-sm font-medium';

        if (theme === 'glassmorphism') {
            return `${baseClasses} text-white/90 hover:text-white hover:bg-white/10`;
        } else if (theme === 'claymorphism') {
            return `${baseClasses} text-zinc-900 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-700`;
        }
        return `${baseClasses} text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800`;
    };

    const menuItems = [
        { label: 'Home', href: '#hero' },
        { label: 'Experience', href: '#experience' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={getNavClassName()}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="#hero" className="flex items-center gap-3 group">
                        <div className={`relative w-10 h-10 rounded-lg overflow-hidden transition-transform group-hover:scale-105 ${theme === 'glassmorphism'
                            ? 'border border-white/20'
                            : theme === 'claymorphism'
                                ? 'clay-card'
                                : 'border border-zinc-200 dark:border-zinc-800'
                            }`}>
                            <Image
                                src="/kt_logo_github_sized.png"
                                alt="KT Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className={`font-bold text-lg ${theme === 'glassmorphism'
                            ? 'text-white'
                            : 'text-zinc-900 dark:text-zinc-50'
                            }`}>
                            Karthikeyan T
                        </span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-2">
                        {menuItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className={getLinkClassName()}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${theme === 'glassmorphism'
                            ? 'text-white hover:bg-white/10'
                            : theme === 'claymorphism'
                                ? 'text-zinc-900 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            }`}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className={`md:hidden mt-4 py-4 rounded-lg ${theme === 'glassmorphism'
                        ? 'glass-card'
                        : theme === 'claymorphism'
                            ? 'clay-card'
                            : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800'
                        }`}>
                        {menuItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className={getLinkClassName(true)}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
