'use client';

import { useTheme } from '@/contexts/ThemeContext';

interface ExtensionProject {
    name: string;
    description: string;
    url: string | null;
    category?: string;
    image?: string;
    status?: string;
    tags?: string[];
    featured?: boolean;
}

interface ChromeExtensionsTableProps {
    projects: ExtensionProject[];
}

function getExtensionIcon(name: string) {
    const lower = name.toLowerCase();

    if (lower.includes('chrome web store') || lower.includes('console')) {
        return (
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/10 p-2 border border-blue-500/20 shadow-sm">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" className="fill-blue-500/10 stroke-blue-500/30" strokeWidth="1" />
                    <path d="M12 2a10 10 0 0 1 8.66 5l-4.33 7.5A5 5 0 0 0 12 7V2z" fill="#EA4335" />
                    <path d="M20.66 7A10 10 0 0 1 17 20.66l-4.33-7.5a5 5 0 0 0 3.66-6.16l4.33 0z" fill="#FBBC05" />
                    <path d="M17 20.66A10 10 0 0 1 3.34 17l4.33-7.5a5 5 0 0 0 9.33 11.16z" fill="#34A853" />
                    <circle cx="12" cy="12" r="4.5" fill="#FFFFFF" />
                    <circle cx="12" cy="12" r="3.2" fill="#4285F4" />
                </svg>
            </div>
        );
    }

    if (lower.includes('trustlens') || lower.includes('risk') || lower.includes('trust')) {
        return (
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/25 shadow-sm">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            </div>
        );
    }

    if (lower.includes('signal') || lower.includes('image')) {
        return (
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 dark:text-violet-400 border border-violet-500/25 shadow-sm">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            </div>
        );
    }

    if (lower.includes('gantto') || lower.includes('timeline')) {
        return (
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500 dark:text-sky-400 border border-sky-500/25 shadow-sm">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            </div>
        );
    }

    if (lower.includes('appsec') || lower.includes('security') || lower.includes('inspector')) {
        return (
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/25 shadow-sm">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
        );
    }

    if (lower.includes('formatter') || lower.includes('code')) {
        return (
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/25 shadow-sm">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            </div>
        );
    }

    // Default: Screenshotify / Screen Capture
    return (
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500 dark:text-pink-400 border border-pink-500/25 shadow-sm">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </div>
    );
}

export default function ChromeExtensionsTable({ projects }: ChromeExtensionsTableProps) {
    const { theme } = useTheme();

    const getTableContainerClass = () => {
        if (theme === 'glassmorphism') {
            return 'glass-card rounded-2xl border border-white/15 overflow-hidden backdrop-blur-xl shadow-2xl';
        }
        if (theme === 'claymorphism') {
            return 'clay-card rounded-2xl overflow-hidden p-1';
        }
        return 'rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden';
    };

    const getHeaderClass = () => {
        if (theme === 'glassmorphism') {
            return 'bg-white/10 text-white/80 border-b border-white/10';
        }
        if (theme === 'claymorphism') {
            return 'bg-zinc-100/60 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700/60';
        }
        return 'bg-zinc-50/90 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 border-b border-zinc-200/80 dark:border-zinc-800/80';
    };

    const getRowHoverClass = () => {
        if (theme === 'glassmorphism') {
            return 'hover:bg-white/[0.08] transition-colors duration-150';
        }
        if (theme === 'claymorphism') {
            return 'hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors duration-150';
        }
        return 'hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors duration-150';
    };

    const getTagClass = () => {
        if (theme === 'glassmorphism') {
            return 'bg-white/10 text-white/90 border border-white/15';
        }
        return 'bg-zinc-100 dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/50';
    };

    return (
        <div className={getTableContainerClass()}>
            {/* Desktop Table Header */}
            <div className={`hidden md:grid grid-cols-12 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider ${getHeaderClass()}`}>
                <div className="col-span-6 flex items-center gap-2">
                    <svg className="h-3.5 w-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>Extension & Capabilities</span>
                </div>
                <div className="col-span-3">Focus Tags</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1 text-right">Access</div>
            </div>

            {/* List Rows */}
            <div className={`divide-y ${theme === 'glassmorphism' ? 'divide-white/10' : 'divide-zinc-100 dark:divide-zinc-800/80'}`}>
                {projects.map((project) => {
                    const isLive = project.status?.toLowerCase() === 'live' || Boolean(project.url);

                    return (
                        <div
                            key={project.name}
                            className={`group p-5 md:px-6 md:py-4 ${getRowHoverClass()}`}
                        >
                            {/* Desktop row structure */}
                            <div className="hidden md:grid grid-cols-12 items-center gap-4">
                                {/* Col 1: Icon + Name + Description */}
                                <div className="col-span-6 flex items-start gap-4">
                                    {getExtensionIcon(project.name)}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className={`text-base font-semibold leading-snug transition-colors ${theme === 'glassmorphism'
                                                ? 'text-white group-hover:text-sky-300'
                                                : 'text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                                }`}>
                                                {project.name}
                                            </h4>
                                        </div>
                                        <p className={`mt-1 text-xs leading-relaxed line-clamp-2 ${theme === 'glassmorphism' ? 'text-white/75' : 'text-zinc-500 dark:text-zinc-400'}`}>
                                            {project.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Col 2: Tags */}
                                <div className="col-span-3">
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags && project.tags.length > 0 ? (
                                            project.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={`${project.name}-${tag}`}
                                                    className={`rounded-md px-2 py-0.5 text-[11px] font-medium leading-tight ${getTagClass()}`}
                                                >
                                                    {tag}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-xs text-zinc-400">-</span>
                                        )}
                                    </div>
                                </div>

                                {/* Col 3: Status Badge */}
                                <div className="col-span-2">
                                    {isLive ? (
                                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60 shadow-xs">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                            </span>
                                            Live on Store
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/60">
                                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                            In Development
                                        </span>
                                    )}
                                </div>

                                {/* Col 4: Action Button */}
                                <div className="col-span-1 text-right">
                                    {project.url ? (
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm transition-all group/btn ${theme === 'glassmorphism'
                                                ? 'bg-white text-zinc-950 hover:bg-white/90'
                                                : 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white'
                                                }`}
                                        >
                                            <span>Install</span>
                                            <svg className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    ) : (
                                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${theme === 'glassmorphism' ? 'text-white/40' : 'text-zinc-400 dark:text-zinc-500'}`}>
                                            <svg className="h-3.5 w-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            Private
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Mobile responsive list layout */}
                            <div className="flex md:hidden flex-col gap-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3">
                                        {getExtensionIcon(project.name)}
                                        <div>
                                            <h4 className={`text-base font-semibold leading-tight ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'}`}>
                                                {project.name}
                                            </h4>
                                            <div className="mt-1.5">
                                                {isLive ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                                        Live on Store
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/60">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                                        In Development
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className={`text-xs leading-relaxed ${theme === 'glassmorphism' ? 'text-white/75' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800/60">
                                    <div className="flex flex-wrap gap-1">
                                        {project.tags?.slice(0, 3).map((tag) => (
                                            <span
                                                key={`${project.name}-m-${tag}`}
                                                className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${getTagClass()}`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {project.url ? (
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold shadow-xs ${theme === 'glassmorphism'
                                                ? 'bg-white text-zinc-950 hover:bg-white/90'
                                                : 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                                                }`}
                                        >
                                            <span>Install</span>
                                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    ) : (
                                        <span className={`text-[11px] font-medium ${theme === 'glassmorphism' ? 'text-white/40' : 'text-zinc-400 dark:text-zinc-500'}`}>
                                            Private Preview
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
