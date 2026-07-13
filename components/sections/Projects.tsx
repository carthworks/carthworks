'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { projects } from '@/lib/data';
import Image from 'next/image';
import { useMemo, useState } from 'react';

interface Project {
    name: string;
    description: string;
    url: string | null;
    category?: string;
    image?: string;
    status?: string;
    tags?: string[];
    featured?: boolean;
}

interface ProjectCategoryProps {
    title: string;
    projects: Project[];
}

const categoryTitles = {
    aiApplications: 'AI & LLM Applications',
    websites: 'Websites',
    tools: 'Tools',
    extensions: 'Chrome Extensions',
    creative: 'Creative Projects',
};

const filters = [
    { label: 'All', value: 'all' },
    { label: 'Live', value: 'live' },
    { label: 'POC', value: 'poc' },
    { label: 'Idea', value: 'idea' },
    { label: 'AI Apps', value: 'AI & LLM Applications' },
    { label: 'Websites', value: 'Websites' },
    { label: 'Tools', value: 'Tools' },
    { label: 'Extensions', value: 'Chrome Extensions' },
    { label: 'Creative', value: 'Creative Projects' },
];

function getStatusLabel(status: string) {
    if (status.toLowerCase() === 'poc') return 'POC';
    return status;
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
    const { theme } = useTheme();

    const getStatusColor = (status: string) => {
        const normalizedStatus = status.toLowerCase();
        if (normalizedStatus === 'poc') return 'bg-violet-600 text-white';
        if (normalizedStatus === 'live') return 'bg-emerald-600 text-white';
        if (normalizedStatus === 'idea') return 'bg-sky-600 text-white';
        if (normalizedStatus === 'production') return 'bg-blue-600 text-white';
        if (normalizedStatus === 'in-progress' || normalizedStatus === 'in progress') return 'bg-amber-500 text-white';
        return 'bg-zinc-600 dark:bg-zinc-500 text-white';
    };

    const getCardClassName = () => {
        const baseClasses = `group h-full overflow-hidden rounded-lg transition-all duration-300 flex flex-col ${featured ? 'md:flex-row' : ''} hover:-translate-y-1`;

        if (theme === 'glassmorphism') {
            return `${baseClasses} glass-card text-white hover:bg-white/10`;
        } else if (theme === 'claymorphism') {
            return `${baseClasses} clay-card hover:shadow-xl`;
        }
        return `${baseClasses} bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl`;
    };

    const imageClassName = featured ? 'relative w-full md:w-2/5 h-56 md:h-auto min-h-56' : 'relative w-full h-44';

    const content = (
        <div className={getCardClassName()}>
            <div className={`${imageClassName} bg-zinc-100 dark:bg-zinc-800 overflow-hidden`}>
                {project.status && (
                    <div className={`absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm ${getStatusColor(project.status)}`}>
                        {getStatusLabel(project.status)}
                    </div>
                )}

                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes={featured ? '(max-width: 768px) 100vw, 40vw' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-12 opacity-40 grayscale">
                        <Image
                            src="/kt_logo_github_sized.png"
                            alt="KT Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                )}
            </div>

            <div className={`${featured ? 'md:w-3/5' : ''} flex flex-1 flex-col p-5`}>
                <div className="mb-3 flex items-center justify-between gap-3">
                    {project.category && (
                        <span className={`rounded-full px-3 py-1 text-[11px] font-medium ${theme === 'glassmorphism'
                            ? 'bg-white/15 text-white'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                            }`}>
                            {project.category}
                        </span>
                    )}
                    {featured && (
                        <span className={`text-[11px] font-semibold uppercase tracking-widest ${theme === 'glassmorphism' ? 'text-white/70' : 'text-zinc-500 dark:text-zinc-400'}`}>
                            Featured
                        </span>
                    )}
                </div>

                <h4 className={`text-lg font-semibold leading-snug ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'
                    }`}>
                    {project.name}
                </h4>
                <p className={`mt-2 text-sm leading-relaxed ${featured ? '' : 'line-clamp-4'} ${theme === 'glassmorphism' ? 'text-white/85' : 'text-zinc-600 dark:text-zinc-400'
                    }`}>
                    {project.description}
                </p>

                {project.tags && project.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.slice(0, featured ? 5 : 3).map((tag) => (
                            <span
                                key={`${project.name}-${tag}`}
                                className={`rounded-md px-2 py-1 text-[11px] ${theme === 'glassmorphism'
                                    ? 'bg-white/10 text-white/80'
                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                                    }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className={`mt-auto pt-5 ${project.url ? '' : 'opacity-60'}`}>
                    <div className={`flex items-center gap-2 text-sm font-medium ${theme === 'glassmorphism'
                        ? 'text-white'
                        : 'text-zinc-700 dark:text-zinc-300'
                        }`}>
                        <span>{project.url ? 'View Project' : 'Concept Preview'}</span>
                        {project.url && (
                            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H8M17 7v9" />
                            </svg>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    if (project.url) {
        return (
            <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
            >
                {content}
            </a>
        );
    }

    return content;
}

function ProjectCategory({ title, projects }: ProjectCategoryProps) {
    const { theme } = useTheme();

    if (projects.length === 0) return null;

    return (
        <div className="mb-14 last:mb-0">
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-zinc-200 pb-3 dark:border-zinc-800">
                <h3 className={`text-2xl font-semibold ${theme === 'glassmorphism'
                    ? 'text-white'
                    : 'text-zinc-900 dark:text-zinc-50'
                    }`}>
                    {title}
                </h3>
                <span className={`text-sm ${theme === 'glassmorphism' ? 'text-white/70' : 'text-zinc-500 dark:text-zinc-400'}`}>
                    {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                </span>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard key={`${title}-${project.name}`} project={project} />
                ))}
            </div>
        </div>
    );
}

export default function Projects() {
    const { theme } = useTheme();
    const [activeFilter, setActiveFilter] = useState('all');

    const allProjects = useMemo<Project[]>(() => Object.entries(projects).flatMap(([key, projectList]) => {
        const title = categoryTitles[key as keyof typeof categoryTitles];
        return projectList.map((project): Project => ({
            ...project,
            category: title,
        }));
    }), []);

    const featuredProjects = allProjects.filter((project) => project.featured);
    const visibleProjects = allProjects.filter((project) => {
        if (activeFilter === 'all') return true;
        const normalizedFilter = activeFilter.toLowerCase();
        return project.status?.toLowerCase() === normalizedFilter || project.category === activeFilter;
    });

    const groupedProjects = Object.values(categoryTitles).map((title) => ({
        title,
        projects: visibleProjects.filter((project) => project.category === title),
    }));

    const getSectionClassName = () => {
        if (theme === 'glassmorphism') {
            return 'py-24 px-6 glass-section';
        } else if (theme === 'claymorphism') {
            return 'py-24 px-6';
        }
        return 'py-24 px-6 bg-white dark:bg-zinc-900';
    };

    const getFilterClassName = (value: string) => {
        const isActive = activeFilter === value;
        const baseClasses = 'rounded-full px-4 py-2 text-sm font-medium transition-all';

        if (theme === 'glassmorphism') {
            return `${baseClasses} ${isActive ? 'bg-white text-zinc-950' : 'bg-white/10 text-white hover:bg-white/20'}`;
        } else if (theme === 'claymorphism') {
            return `${baseClasses} ${isActive ? 'clay-card text-zinc-900 dark:text-zinc-50' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'}`;
        }
        return `${baseClasses} ${isActive
            ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
            : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
            }`;
    };

    return (
        <section id="projects" className={getSectionClassName()}>
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 flex flex-col gap-6">
                    <div>
                        <h2 className={`text-4xl font-bold lg:text-5xl ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'
                            }`}>
                            Projects & Portfolio
                        </h2>
                        <p className={`mt-4 max-w-2xl text-lg ${theme === 'glassmorphism' ? 'text-white/90' : 'text-zinc-600 dark:text-zinc-400'
                            }`}>
                            Production applications, AI tools, SaaS platforms, and practical experiments built around real problems.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2" aria-label="Project filters">
                        {filters.map((filter) => (
                            <button
                                key={filter.value}
                                type="button"
                                onClick={() => setActiveFilter(filter.value)}
                                className={getFilterClassName(filter.value)}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                {activeFilter === 'all' && featuredProjects.length > 0 && (
                    <div className="mb-16">
                        <div className="mb-6 flex items-end justify-between gap-4">
                            <div>
                                <h3 className={`text-2xl font-semibold ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'}`}>
                                    Featured Builds
                                </h3>
                                <p className={`mt-2 text-sm ${theme === 'glassmorphism' ? 'text-white/75' : 'text-zinc-500 dark:text-zinc-400'}`}>
                                    A quick signal of the strongest AI, SaaS, and security work.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                            {featuredProjects.map((project) => (
                                <ProjectCard key={`featured-${project.name}`} project={project} featured />
                            ))}
                        </div>
                    </div>
                )}

                {visibleProjects.length > 0 ? (
                    groupedProjects.map((group) => (
                        <ProjectCategory key={group.title} title={group.title} projects={group.projects} />
                    ))
                ) : (
                    <div className={`rounded-lg p-8 text-center ${theme === 'glassmorphism'
                        ? 'glass-card text-white'
                        : 'bg-zinc-50 text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-300'
                        }`}>
                        No projects match this filter yet.
                    </div>
                )}
            </div>
        </section>
    );
}
