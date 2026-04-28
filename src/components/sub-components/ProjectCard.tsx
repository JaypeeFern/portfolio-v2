import { ArrowUpRight, FolderKanban } from 'lucide-react';
import type { PortfolioProject } from '@/lib/portfolio';

interface ProjectCardProps {
    project: PortfolioProject
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const { projectName, projectDescription, tools, dateOfDevelopment, links } = project;
    const githubLink = links?.github;
    const liveLink = links?.live;
    const hasProjectLinks = Boolean(githubLink || liveLink);

    return (
        <article className="project-card">
            <div className="project-card__preview" aria-hidden="true">
                <FolderKanban className="h-8 w-8 text-primary" strokeWidth={1.5} />
                <div className="project-card__lines">
                    <span />
                    <span />
                    <span />
                </div>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
                <div className="space-y-2">
                    <p className="section-label">
                        {dateOfDevelopment.from} - {dateOfDevelopment.to}
                    </p>
                    <h3 className="font-display text-2xl font-semibold tracking-normal text-foreground">
                        {projectName}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                        {projectDescription}
                    </p>
                </div>

                {tools.length > 0 && (
                    <ul className="flex flex-wrap gap-2" aria-label={`${projectName} tools`}>
                        {tools.map((tool) => (
                            <li key={tool} className="tag">
                                {tool}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-auto flex flex-wrap gap-4 border-t border-border px-5 py-4 text-sm sm:px-6">
                {githubLink && (
                    <a href={githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                        Source
                        <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                    </a>
                )}
                {liveLink && (
                    <a href={liveLink} target="_blank" rel="noopener noreferrer" className="project-link">
                        Live
                        <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                    </a>
                )}
                {!hasProjectLinks && (
                    <span className="text-muted-foreground">
                        Links not published yet
                    </span>
                )}
            </div>
        </article>
    );
}
