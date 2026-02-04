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
            return 'py-24 px-6 glass-section';
        } else if (theme === 'claymorphism') {
            return 'py-24 px-6';
        }
        return 'py-24 px-6 bg-zinc-50 dark:bg-zinc-950';
    };

    const getInputClassName = () => {
        const baseClasses = 'w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all';

        if (theme === 'glassmorphism') {
            return `${baseClasses} bg-white/10 backdrop-blur-sm border border-white/20 focus:ring-white/50 text-white placeholder-white/60`;
        } else if (theme === 'claymorphism') {
            return `${baseClasses} clay-card text-zinc-900 dark:text-zinc-50 focus:ring-zinc-400`;
        }
        return `${baseClasses} bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:ring-zinc-900 dark:focus:ring-zinc-50 text-zinc-900 dark:text-zinc-50`;
    };

    const getButtonClassName = () => {
        const baseClasses = 'w-full px-8 py-4 rounded-lg font-medium transition-all duration-200';

        if (theme === 'glassmorphism') {
            return `${baseClasses} bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 shadow-lg hover:shadow-xl`;
        } else if (theme === 'claymorphism') {
            return `${baseClasses} clay-card text-zinc-900 dark:text-zinc-50`;
        }
        return `${baseClasses} bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-lg hover:shadow-xl`;
    };

    return (
        <section id="contact" className={getSectionClassName()}>
            <div className="max-w-4xl mx-auto">
                <h2 className={`text-4xl lg:text-5xl font-bold mb-4 ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'
                    }`}>
                    Get In Touch
                </h2>
                <p className={`text-lg mb-12 max-w-2xl ${theme === 'glassmorphism' ? 'text-white/90' : 'text-zinc-600 dark:text-zinc-400'
                    }`}>
                    Interested in collaborating? Let&apos;s discuss how we can work together.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h3 className={`text-xl font-semibold mb-6 ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'
                            }`}>
                            Contact Information
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className={`text-sm mb-1 ${theme === 'glassmorphism' ? 'text-white/60' : 'text-zinc-500 dark:text-zinc-500'
                                    }`}>Email</p>
                                <a
                                    href={`mailto:${personalInfo.email}`}
                                    className={`transition-colors ${theme === 'glassmorphism'
                                            ? 'text-white hover:text-white/80'
                                            : 'text-zinc-900 dark:text-zinc-50 hover:text-zinc-600 dark:hover:text-zinc-400'
                                        }`}
                                >
                                    {personalInfo.email}
                                </a>
                            </div>
                            <div>
                                <p className={`text-sm mb-1 ${theme === 'glassmorphism' ? 'text-white/60' : 'text-zinc-500 dark:text-zinc-500'
                                    }`}>Phone</p>
                                <a
                                    href={`tel:${personalInfo.phone}`}
                                    className={`transition-colors ${theme === 'glassmorphism'
                                            ? 'text-white hover:text-white/80'
                                            : 'text-zinc-900 dark:text-zinc-50 hover:text-zinc-600 dark:hover:text-zinc-400'
                                        }`}
                                >
                                    {personalInfo.phone}
                                </a>
                            </div>
                            <div>
                                <p className={`text-sm mb-1 ${theme === 'glassmorphism' ? 'text-white/60' : 'text-zinc-500 dark:text-zinc-500'
                                    }`}>Location</p>
                                <p className={theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'}>
                                    {personalInfo.location}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className={`text-sm mb-4 ${theme === 'glassmorphism' ? 'text-white/60' : 'text-zinc-500 dark:text-zinc-500'
                                }`}>Connect</h4>
                            <div className="flex gap-4">
                                <a
                                    href={`https://${personalInfo.github}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'glassmorphism'
                                            ? 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
                                            : theme === 'claymorphism'
                                                ? 'clay-card text-zinc-900 dark:text-zinc-50'
                                                : 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200'
                                        }`}
                                >
                                    GitHub
                                </a>
                                <a
                                    href={`https://${personalInfo.linkedin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'glassmorphism'
                                            ? 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
                                            : theme === 'claymorphism'
                                                ? 'clay-card text-zinc-900 dark:text-zinc-50'
                                                : 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200'
                                        }`}
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-700 dark:text-zinc-300'
                                    }`}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className={getInputClassName()}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-700 dark:text-zinc-300'
                                    }`}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={getInputClassName()}
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-700 dark:text-zinc-300'
                                    }`}>
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className={getInputClassName()}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-700 dark:text-zinc-300'
                                    }`}>
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className={`${getInputClassName()} resize-none`}
                                />
                            </div>

                            <button type="submit" className={getButtonClassName()}>
                                Send Message
                            </button>

                            {status === 'success' && (
                                <p className="text-sm text-green-600 dark:text-green-400 text-center">
                                    Opening your email client...
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
