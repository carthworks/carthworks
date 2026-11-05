'use client';

import { useState } from 'react';
import { personalInfo } from '@/lib/data';
import { useTheme } from '@/contexts/ThemeContext';

export default function Contact() {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;

        window.location.href = mailtoLink;

        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => setStatus('idle'), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const getSectionClassName = () => {
        if (theme === 'glassmorphism') {
            return 'py-12 px-6 glass-section';
        } else if (theme === 'claymorphism') {
            return 'py-12 px-6';
        }
        return 'py-12 px-6 bg-zinc-50 dark:bg-zinc-950';
    };

    const getCardClassName = () => {
        if (theme === 'glassmorphism') {
            return 'p-5 rounded-xl glass-card';
        } else if (theme === 'claymorphism') {
            return 'p-5 rounded-xl clay-card';
        }
        return 'p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800';
    };

    const getInputClassName = () => {
        const baseClasses = 'w-full px-3.5 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 transition-all';

        if (theme === 'glassmorphism') {
            return `${baseClasses} bg-white/10 backdrop-blur-sm border border-white/20 focus:ring-white/50 text-white placeholder-white/50`;
        } else if (theme === 'claymorphism') {
            return `${baseClasses} clay-card text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:ring-zinc-400`;
        }
        return `${baseClasses} bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:ring-zinc-900 dark:focus:ring-zinc-50 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500`;
    };

    const getButtonClassName = () => {
        const baseClasses = 'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200';

        if (theme === 'glassmorphism') {
            return `${baseClasses} bg-white text-zinc-900 hover:bg-white/90 shadow-sm`;
        } else if (theme === 'claymorphism') {
            return `${baseClasses} clay-card text-zinc-900 dark:text-zinc-50`;
        }
        return `${baseClasses} bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-sm`;
    };

    const getLinkPillClassName = () => {
        const base = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all';
        if (theme === 'glassmorphism') {
            return `${base} bg-white/15 text-white border border-white/20 hover:bg-white/25`;
        } else if (theme === 'claymorphism') {
            return `${base} clay-card text-zinc-900 dark:text-zinc-50`;
        }
        return `${base} bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700`;
    };

    return (
        <section id="contact" className={getSectionClassName()}>
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <h2 className={`text-3xl lg:text-4xl font-bold ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'}`}>
                        Get In Touch
                    </h2>
                    <p className={`mt-1 text-sm ${theme === 'glassmorphism' ? 'text-white/80' : 'text-zinc-600 dark:text-zinc-400'}`}>
                        Have a project or idea in mind? Reach out directly or drop a quick message.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Direct Contact & Socials */}
                    <div className={`lg:col-span-5 space-y-4 ${getCardClassName()}`}>
                        <div className="space-y-3">
                            <a
                                href={`mailto:${personalInfo.email}`}
                                className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                                    theme === 'glassmorphism' ? 'hover:bg-white/10' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                                }`}
                            >
                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                    theme === 'glassmorphism' ? 'bg-white/15 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                                }`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <p className={`text-[11px] uppercase tracking-wider ${theme === 'glassmorphism' ? 'text-white/60' : 'text-zinc-400 dark:text-zinc-500'}`}>
                                        Email
                                    </p>
                                    <p className={`text-sm font-medium truncate ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'}`}>
                                        {personalInfo.email}
                                    </p>
                                </div>
                            </a>

                            <a
                                href={`tel:${personalInfo.phone}`}
                                className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                                    theme === 'glassmorphism' ? 'hover:bg-white/10' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                                }`}
                            >
                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                    theme === 'glassmorphism' ? 'bg-white/15 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                                }`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className={`text-[11px] uppercase tracking-wider ${theme === 'glassmorphism' ? 'text-white/60' : 'text-zinc-400 dark:text-zinc-500'}`}>
                                        Phone
                                    </p>
                                    <p className={`text-sm font-medium ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'}`}>
                                        {personalInfo.phone}
                                    </p>
                                </div>
                            </a>

                            <div className="flex items-center gap-3 p-2.5">
                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                    theme === 'glassmorphism' ? 'bg-white/15 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                                }`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className={`text-[11px] uppercase tracking-wider ${theme === 'glassmorphism' ? 'text-white/60' : 'text-zinc-400 dark:text-zinc-500'}`}>
                                        Location
                                    </p>
                                    <p className={`text-sm font-medium ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'}`}>
                                        {personalInfo.location}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={`pt-3 border-t ${theme === 'glassmorphism' ? 'border-white/15' : 'border-zinc-200 dark:border-zinc-800'}`}>
                            <div className="flex flex-wrap gap-2">
                                <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className={getLinkPillClassName()}>
                                    GitHub ↗
                                </a>
                                <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className={getLinkPillClassName()}>
                                    LinkedIn ↗
                                </a>
                                <a href={personalInfo.courses} target="_blank" rel="noopener noreferrer" className={getLinkPillClassName()}>
                                    Courses ↗
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Compact Contact Form */}
                    <form onSubmit={handleSubmit} className={`lg:col-span-7 space-y-3 ${getCardClassName()}`}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className={getInputClassName()}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={getInputClassName()}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="sr-only">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className={getInputClassName()}
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="sr-only">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="How can I help?"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={3}
                                className={`${getInputClassName()} resize-none`}
                            />
                        </div>

                        <div className="flex items-center justify-between gap-4 pt-1">
                            {status === 'success' ? (
                                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                                    Opening your email client...
                                </p>
                            ) : (
                                <span />
                            )}
                            <button type="submit" className={getButtonClassName()}>
                                <span>Send Message</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
