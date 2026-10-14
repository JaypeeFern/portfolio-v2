import { ArrowUpRight } from 'lucide-react';
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
        <article className="project-entry">
            <div className="project-entry__identity">
                <p className="project-entry__period section-label">
                    {dateOfDevelopment.from} - {dateOfDevelopment.to}
                </p>
                <h3 className="project-entry__name">{projectName}</h3>
            </div>

            <div className="project-entry__details">
                <p className="project-entry__description">{projectDescription}</p>

                <div className="project-entry__meta">
                    {tools.length > 0 && (
                        <div className="project-entry__toolset">
                            <p className="project-entry__label">Built with</p>
                            <ul className="project-entry__tools" aria-label={`${projectName} tools`}>
                                {tools.map((tool) => (
                                    <li key={tool}>{tool}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="project-entry__links">
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
                            <span className="project-entry__unpublished">Links not published yet</span>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
