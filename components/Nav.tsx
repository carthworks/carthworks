'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

export default function Nav() {
    const { theme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('#projects');

    useEffect(() => {
        const handleWindowScroll = () => {
            setIsScrolled(window.scrollY > 10);
            updateActiveSection();
        };

        const handleContainerScroll = () => {
            updateActiveSection();
        };

        const updateActiveSection = () => {
            // Determine if we are on desktop (scroll container exists and is visible)
            const scrollContainer = document.getElementById('content-scroll');
            const isDesktop = scrollContainer && scrollContainer.offsetParent !== null;

            let currentSection = '#hero';
            let minDistance = Infinity;

            for (const item of menuItems) {
                const targetId = item.href.replace('#', '');
                // Find visible element
                const elements = document.querySelectorAll(`#${targetId}`);
                let targetElement: HTMLElement | null = null;
                for (let i = 0; i < elements.length; i++) {
                    if ((elements[i] as HTMLElement).offsetParent !== null) {
                        targetElement = elements[i] as HTMLElement;
                        break;
                    }
                }

                if (targetElement) {
                    let distance = 0;
                    if (isDesktop && scrollContainer) {
                        // Calculate distance from top of scroll container
                        const containerRect = scrollContainer.getBoundingClientRect();
                        const targetRect = targetElement.getBoundingClientRect();
                        // Distance is how far the top of the element is from the top of the container
                        // We want the element that is closest to the top (but maybe slightly below or above 0)
                        distance = Math.abs(targetRect.top - containerRect.top);
                    } else {
                        // Mobile: distance from top of viewport
                        distance = Math.abs(targetElement.getBoundingClientRect().top);
                    }

                    // We consider an element "active" if it's close to the top
                    // Or we can just find the one with the smallest positive top value?
                    // Let's stick to simple smallest distance for now, maybe biased slightly
                    if (distance < minDistance) {
                        minDistance = distance;
                        currentSection = item.href;
                    }
                }
            }
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleWindowScroll);

        // Attach to content-scroll for desktop
        // We need to wait for it to exist maybe? or just try attaching
        const container = document.getElementById('content-scroll');
        if (container) {
            container.addEventListener('scroll', handleContainerScroll);
        }

        // Set initial active section
        updateActiveSection();

        return () => {
            window.removeEventListener('scroll', handleWindowScroll);
            if (container) {
                container.removeEventListener('scroll', handleContainerScroll);
            }
        };
    }, []); // Check container binding on mount might settle, but ideally we retry if not found? 
    // For now assuming it mounts quickly.

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

    const getLinkClassName = (href: string, isMobile = false) => {
        const isActive = activeSection === href;
        const baseClasses = isMobile
            ? 'block px-4 py-3 rounded-lg transition-all'
            : 'px-4 py-2 rounded-lg transition-all text-sm font-medium';

        // Active state styling
        const activeClasses = isActive
            ? 'font-bold'
            : '';

        if (theme === 'glassmorphism') {
            if (isActive) return `${baseClasses} ${activeClasses} bg-white/20 text-white`;
            return `${baseClasses} text-white/90 hover:text-white hover:bg-white/10`;
        } else if (theme === 'claymorphism') {
            if (isActive) return `${baseClasses} ${activeClasses} bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50`;
            return `${baseClasses} text-zinc-900 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-700`;
        }

        if (isActive) return `${baseClasses} ${activeClasses} bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50`;
        return `${baseClasses} text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800`;
    };

    const menuItems = [
        { label: 'Home', href: '#hero' },
        { label: 'Projects', href: '#projects' },
        { label: 'Experience', href: '#experience' },
        { label: 'Skills', href: '#skills' },
        { label: 'Contact', href: '#contact' },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        // Small delay to ensure DOM is ready
        setTimeout(() => {
            const targetId = href.replace('#', '');

            // Find the visible element with this ID
            // We have duplicate IDs because of the mobile/desktop layout split
            const elements = document.querySelectorAll(`#${targetId}`);
            let targetElement: HTMLElement | null = null;

            for (let i = 0; i < elements.length; i++) {
                const el = elements[i] as HTMLElement;
                // Check if element is visible (offsetParent is not null for visible elements)
                if (el.offsetParent !== null) {
                    targetElement = el;
                    break;
                }
            }

            // For desktop split-screen layout
            const scrollContainer = document.getElementById('content-scroll');
            // Check if we are in desktop mode (scroll container exists and is visible)
            const isDesktop = scrollContainer && scrollContainer.offsetParent !== null;

            if (isDesktop && scrollContainer) {
                // Desktop: scroll within the right panel
                if (targetId === 'hero') {
                    scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (targetElement) {
                    // Check if the target is actually inside the scroll container
                    if (scrollContainer.contains(targetElement)) {
                        const containerRect = scrollContainer.getBoundingClientRect();
                        const targetRect = targetElement.getBoundingClientRect();
                        const scrollTop = scrollContainer.scrollTop;
                        const offsetTop = targetRect.top - containerRect.top + scrollTop;

                        scrollContainer.scrollTo({
                            top: offsetTop - 40, // Reduced offset since sticky nav isn't over this content usually? 
                            // Actually standard 20-40px padding is good.
                            behavior: 'smooth'
                        });
                    } else {
                        // Target is not in scroll container (e.g. it's the Hero sidebar)
                        // If user clicked a link to something not in the scroll view, do nothing or specific logic
                        if (targetId === 'hero') {
                            scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }
                }
            } else if (targetElement) {
                // Mobile: scroll the window with offset
                const offset = 80; // Navbar height approx
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 50);

        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={getNavClassName()}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a
                        href="#hero"
                        className="flex items-center gap-3 group transition-all duration-300 lg:opacity-0 lg:invisible lg:pointer-events-none"
                        onClick={(e) => handleNavClick(e, '#hero')}
                    >
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
                                className={getLinkClassName(item.href)}
                                onClick={(e) => handleNavClick(e, item.href)}
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
                                className={getLinkClassName(item.href, true)}
                                onClick={(e) => handleNavClick(e, item.href)}
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
