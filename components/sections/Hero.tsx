'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { personalInfo, portfolioStats } from '@/lib/data';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

// ─── Animated orb colours per theme ─────────────────────────────────────────
const ORB_THEMES = {
    default: [
        { color: 'rgba(99,102,241,0.18)', size: 320, top: '5%',  left: '-10%', dur: '12s', delay: '0s'  },
        { color: 'rgba(168,85,247,0.13)',  size: 260, top: '55%', left: '60%',  dur: '17s', delay: '-4s' },
        { color: 'rgba(14,165,233,0.12)',  size: 200, top: '75%', left: '-5%',  dur: '14s', delay: '-8s' },
        { color: 'rgba(234,179,8,0.10)',   size: 180, top: '15%', left: '65%',  dur: '19s', delay: '-2s' },
    ],
    glassmorphism: [
        { color: 'rgba(99,102,241,0.35)', size: 340, top: '-5%', left: '-12%', dur: '13s', delay: '0s'  },
        { color: 'rgba(168,85,247,0.28)', size: 280, top: '50%', left: '55%',  dur: '18s', delay: '-5s' },
        { color: 'rgba(14,165,233,0.25)', size: 220, top: '78%', left: '-8%',  dur: '15s', delay: '-9s' },
        { color: 'rgba(59,130,246,0.20)', size: 190, top: '20%', left: '70%',  dur: '20s', delay: '-3s' },
    ],
    claymorphism: [
        { color: 'rgba(147,197,253,0.25)', size: 300, top: '0%',  left: '-8%', dur: '14s', delay: '0s'   },
        { color: 'rgba(196,181,253,0.20)', size: 250, top: '60%', left: '58%', dur: '18s', delay: '-6s'  },
        { color: 'rgba(167,243,208,0.18)', size: 210, top: '80%', left: '-4%', dur: '16s', delay: '-10s' },
        { color: 'rgba(253,230,138,0.15)', size: 175, top: '10%', left: '68%', dur: '21s', delay: '-2s'  },
    ],
};

// ─── Canvas floating particles ───────────────────────────────────────────────
function useParticleCanvas(
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    theme: string
) {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const particleColor =
            theme === 'glassmorphism' ? 'rgba(255,255,255,' :
            theme === 'claymorphism'  ? 'rgba(100,116,139,' : 'rgba(99,102,241,';

        let animId: number;
        const PARTICLE_COUNT = 38;

        const resize = () => {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();

        type Particle = {
            x: number; y: number; vx: number; vy: number;
            r: number; alpha: number; alphaDir: number;
        };

        const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r:  Math.random() * 2.5 + 0.8,
            alpha:    Math.random() * 0.5 + 0.15,
            alphaDir: Math.random() > 0.5 ? 1 : -1,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.vx; p.y += p.vy;
                p.alpha += p.alphaDir * 0.003;
                if (p.alpha > 0.65 || p.alpha < 0.1) p.alphaDir *= -1;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width)  p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = particleColor + p.alpha.toFixed(2) + ')';
                ctx.fill();
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 80) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = particleColor + ((1 - dist / 80) * 0.15).toFixed(2) + ')';
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            animId = requestAnimationFrame(draw);
        };
        draw();

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);
        return () => { cancelAnimationFrame(animId); ro.disconnect(); };
    }, [canvasRef, theme]);
}

export default function Hero() {
    const { theme } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useParticleCanvas(canvasRef, theme);

    const orbs = ORB_THEMES[theme as keyof typeof ORB_THEMES] ?? ORB_THEMES.default;

    const getSectionClassName = () => {
        if (theme === 'glassmorphism')
            return 'min-h-screen lg:min-h-0 lg:h-full lg:overflow-y-auto flex items-center lg:items-start justify-center px-6 py-20 lg:py-6 glass-section';
        if (theme === 'claymorphism')
            return 'min-h-screen lg:min-h-0 lg:h-full lg:overflow-y-auto flex items-center lg:items-start justify-center px-6 py-20 lg:py-6';
        return 'min-h-screen lg:min-h-0 lg:h-full lg:overflow-y-auto flex items-center lg:items-start justify-center px-6 py-20 lg:py-6 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900';
    };

    const getTextColor    = () => theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-50';
    const getSubTextColor = () => theme === 'glassmorphism' ? 'text-white/90' : 'text-zinc-600 dark:text-zinc-400';

    const getButtonClassName = (variant: 'primary' | 'secondary') => {
        const base = 'px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200';
        if (theme === 'glassmorphism') {
            return variant === 'primary'
                ? `${base} bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 shadow-lg hover:shadow-xl`
                : `${base} bg-transparent text-white border-2 border-white/50 hover:bg-white/10`;
        }
        if (theme === 'claymorphism') return `${base} clay-card text-zinc-900 dark:text-zinc-50`;
        return variant === 'primary'
            ? `${base} bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-lg hover:shadow-xl`
            : `${base} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border-2 border-zinc-900 dark:border-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-800`;
    };

    const handleHeroNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setTimeout(() => {
            const targetId = href.replace('#', '');
            const elements = document.querySelectorAll(`#${targetId}`);
            let targetElement: HTMLElement | null = null;
            for (let i = 0; i < elements.length; i++) {
                const el = elements[i] as HTMLElement;
                if (el.offsetParent !== null) { targetElement = el; break; }
            }
            if (!targetElement) return;

            const scrollContainer = document.getElementById('content-scroll');
            const isDesktop = scrollContainer && scrollContainer.offsetParent !== null;

            if (isDesktop && scrollContainer && scrollContainer.contains(targetElement)) {
                const offsetTop =
                    targetElement.getBoundingClientRect().top
                    - scrollContainer.getBoundingClientRect().top
                    + scrollContainer.scrollTop;
                scrollContainer.scrollTo({ top: offsetTop - 40, behavior: 'smooth' });
            } else {
                window.scrollTo({
                    top: targetElement.getBoundingClientRect().top + window.pageYOffset - 80,
                    behavior: 'smooth',
                });
            }
        }, 50);
    };

    return (
        <section id="hero" className={`${getSectionClassName()} relative overflow-hidden`}>

            {/* Keyframe animations */}
            <style>{`
                @keyframes hero-orb-float {
                    0%   { transform: translate(0,0) scale(1); }
                    33%  { transform: translate(18px,-22px) scale(1.06); }
                    66%  { transform: translate(-14px,14px) scale(0.95); }
                    100% { transform: translate(0,0) scale(1); }
                }
                @keyframes hero-orb-pulse {
                    0%,100% { opacity:1; }
                    50%     { opacity:0.6; }
                }
            `}</style>

            {/* Gradient orbs */}
            {orbs.map((orb, i) => (
                <div
                    key={i}
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: orb.top, left: orb.left,
                        width: orb.size, height: orb.size,
                        borderRadius: '50%',
                        background: orb.color,
                        filter: 'blur(54px)',
                        animationName: `hero-orb-float, hero-orb-pulse`,
                        animationDuration: `${orb.dur}, ${orb.dur}`,
                        animationTimingFunction: 'ease-in-out, ease-in-out',
                        animationIterationCount: 'infinite, infinite',
                        animationDelay: `${orb.delay}, ${orb.delay}`,
                        pointerEvents: 'none',
                        zIndex: 0,
                    }}
                />
            ))}

            {/* Particle canvas */}
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
            />

            {/* Content */}
            <div
                className="w-full h-full flex items-center lg:items-start justify-center px-4 lg:px-4"
                style={{ position: 'relative', zIndex: 1 }}
            >
                <div className="w-full max-w-sm">

                    {/* Logo */}
                    <div className="flex justify-center mb-3 lg:mb-2">
                        <div className={`relative w-24 h-24 lg:w-16 lg:h-16 rounded-xl overflow-hidden shadow-xl transition-transform hover:scale-105 ${
                            theme === 'glassmorphism' ? 'border-2 border-white/30'
                            : theme === 'claymorphism' ? 'clay-card'
                            : 'border-2 border-zinc-200 dark:border-zinc-800'
                        }`}>
                            <Image src="/kt_logo_github_sized.png" alt="Karthikeyan T Logo" fill className="object-cover" priority />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="text-center space-y-3 lg:space-y-2.5">
                        <h1 className={`text-xl lg:text-2xl font-bold tracking-tight ${getTextColor()}`}>
                            {personalInfo.name}
                        </h1>

                        <p className={`text-xs lg:text-sm font-medium leading-snug ${getSubTextColor()}`}>
                            {personalInfo.title}
                        </p>

                        <div className={`w-12 h-0.5 mx-auto ${theme === 'glassmorphism' ? 'bg-white/30' : 'bg-zinc-300 dark:bg-zinc-700'}`} />

                        <p className={`text-md leading-relaxed line-clamp-9 lg:line-clamp-7 ${
                            theme === 'glassmorphism' ? 'text-white/75' : 'text-zinc-600 dark:text-zinc-400'
                        }`}>
                            {personalInfo.bio}
                        </p>

                        <div className="grid grid-cols-2 gap-2 pt-2">
                            {portfolioStats.map((stat) => (
                                <div
                                    key={`${stat.value}-${stat.label}`}
                                    className={`rounded-lg px-3 py-2 text-left ${
                                        theme === 'glassmorphism' ? 'bg-white/10 border border-white/10'
                                        : theme === 'claymorphism' ? 'clay-card'
                                        : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800'
                                    }`}
                                >
                                    <div className={`text-sm font-bold ${getTextColor()}`}>{stat.value}</div>
                                    <div className={`text-[11px] leading-snug ${getSubTextColor()}`}>{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        {/* <div className="flex flex-col gap-2 pt-2">
                            <a href="#projects" className={getButtonClassName('primary')} onClick={(e) => handleHeroNavClick(e, '#projects')}>
                                View Projects
                            </a>
                            <a href="#contact" className={getButtonClassName('secondary')} onClick={(e) => handleHeroNavClick(e, '#contact')}>
                                Let&apos;s Solve a Real Problem
                            </a>
                        </div> */}

                        <div className={`w-12 h-0.5 mx-auto ${theme === 'glassmorphism' ? 'bg-white/30' : 'bg-zinc-300 dark:bg-zinc-700'}`} />

                        {/* Social Links */}
                        <div className="flex justify-center gap-4 pt-2">
                            <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" title="GitHub"
                                className={`transition-all hover:scale-110 ${theme === 'glassmorphism' ? 'text-white/80 hover:text-white' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'}`}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" title="LinkedIn"
                                className={`transition-all hover:scale-110 ${theme === 'glassmorphism' ? 'text-white/80 hover:text-white' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'}`}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a href={`https://${personalInfo.behance}`} target="_blank" rel="noopener noreferrer" title="Behance"
                                className={`transition-all hover:scale-110 ${theme === 'glassmorphism' ? 'text-white/80 hover:text-white' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'}`}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                                </svg>
                            </a>
                            <a href={`mailto:${personalInfo.email}`} title="Email"
                                className={`transition-all hover:scale-110 ${theme === 'glassmorphism' ? 'text-white/80 hover:text-white' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'}`}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </a>
                        </div>

                        {/* Download Resume */}
                        <div className="flex justify-center pt-4">
                            <a
                                href={personalInfo.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-medium transition-all hover:scale-105 ${
                                    theme === 'glassmorphism' ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                                    : theme === 'claymorphism' ? 'clay-card text-zinc-900 dark:text-zinc-50'
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
