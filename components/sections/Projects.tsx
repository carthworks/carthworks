'use client';

import { projects } from '@/lib/data';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';

interface Project {
    name: string;
    description: string;
    url: string | null;
    category?: string;
    image?: string;
}

interface ProjectCategoryProps {
    title: string;
    projects: Project[];
}

function ProjectCard({ project }: { project: Project }) {
    const { theme } = useTheme();

    const getCardClassName = () => {
        const baseClasses = "h-full overflow-hidden rounded-lg transition-all duration-300 flex flex-col";

        if (theme === 'glassmorphism') {
            return `${baseClasses} glass-card text-white`;
        } else if (theme === 'claymorphism') {
            return `${baseClasses} clay-card`;
        }
        return `${baseClasses} bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg`;
    };

    const content = (
        <div className={getCardClassName()}>
            {/* Header with Image */}
            <div className="relative w-full h-48 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 overflow-hidden">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl font-bold text-zinc-300 dark:text-zinc-700">
                            {project.name.charAt(0)}
                        </div>
                    </div>
                )}
                {/* Category badge */}
                {project.category && (
                    <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${theme === 'glassmorphism'
                            ? 'bg-white/20 text-white backdrop-blur-sm'
                            : theme === 'claymorphism'
                                ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                                : 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900'
                            }`}>
                            {project.category}
                        </span>
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="flex-1 p-6 flex flex-col">
                <h4 className={`text-lg font-semibold mb-2 ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'
                    }`}>
                    {project.name}
                </h4>
                <p className={`text-sm leading-relaxed mb-4 flex-1 ${theme === 'glassmorphism' ? 'text-white/90' : 'text-zinc-600 dark:text-zinc-400'
                    }`}>
                    {project.description}
                </p>

                {/* Link */}
                {project.url && (
                    <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
                        <div className={`flex items-center gap-2 text-sm font-medium ${theme === 'glassmorphism'
                            ? 'text-white'
                            : 'text-zinc-700 dark:text-zinc-300'
                            }`}>
                            <span>View Project</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>
                    </div>
                )}
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

    return (
        <div className="mb-16 last:mb-0">
            <h3 className={`text-2xl font-semibold mb-6 pb-3 border-b ${theme === 'glassmorphism'
                ? 'text-white border-white/20'
                : theme === 'claymorphism'
                    ? 'text-zinc-900 dark:text-zinc-50 border-zinc-300 dark:border-zinc-700'
                    : 'text-zinc-900 dark:text-zinc-50 border-zinc-200 dark:border-zinc-800'
                }`}>
                {title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={{ ...project, category: title.split(' ')[0] }} />
                ))}
            </div>
        </div>
    );
}

export default function Projects() {
    const { theme } = useTheme();

    const getSectionClassName = () => {
        if (theme === 'glassmorphism') {
            return 'py-24 px-6 glass-section';
        } else if (theme === 'claymorphism') {
            return 'py-24 px-6';
        }
        return 'py-24 px-6 bg-white dark:bg-zinc-900';
    };

    return (
        <section id="projects" className={getSectionClassName()}>
            <div className="max-w-6xl mx-auto">
                <h2 className={`text-4xl lg:text-5xl font-bold mb-4 ${theme === 'glassmorphism' ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'
                    }`}>
                    Projects & Portfolio
                </h2>
                <p className={`text-lg mb-12 max-w-2xl ${theme === 'glassmorphism' ? 'text-white/90' : 'text-zinc-600 dark:text-zinc-400'
                    }`}>
                    A selection of production applications, AI tools, and creative experiments
                </p>

                <ProjectCategory title="Websites" projects={projects.websites} />
                <ProjectCategory title="AI & LLM Applications" projects={projects.aiApplications} />

                {/* Chrome Extensions with nested Security & Developer Tools */}
                <div className="mb-16 last:mb-0">
                    <h3 className={`text-2xl font-semibold mb-6 pb-3 border-b ${theme === 'glassmorphism'
                        ? 'text-white border-white/20'
                        : theme === 'claymorphism'
                            ? 'text-zinc-900 dark:text-zinc-50 border-zinc-300 dark:border-zinc-700'
                            : 'text-zinc-900 dark:text-zinc-50 border-zinc-200 dark:border-zinc-800'
                        }`}>
                        Chrome Extensions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {projects.extensions.map((project, index) => (
                            <ProjectCard key={index} project={{ ...project, category: 'Extension' }} />
                        ))}
                    </div>

                    {/* Nested Security & Developer Tools */}
                    <div className="mt-8 pl-6 border-l-4 border-zinc-300 dark:border-zinc-700">
                        <h4 className={`text-xl font-semibold mb-4 ${theme === 'glassmorphism'
                            ? 'text-white/90'
                            : 'text-zinc-800 dark:text-zinc-200'
                            }`}>
                            Security & Developer Tools
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {projects.tools.map((project, index) => (
                                <ProjectCard key={index} project={{ ...project, category: 'Tool' }} />
                            ))}
                        </div>
                    </div>
                </div>

                <ProjectCategory title="Creative Projects" projects={projects.creative} />
            </div>
        </section>
    );
}
