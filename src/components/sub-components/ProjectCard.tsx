import { ArrowUpRight, FolderOpenDot } from 'lucide-react';
import { portfolioData, type PortfolioProject } from '@/lib/portfolio';

interface ProjectCardProps {
    project: PortfolioProject
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const { projectName, projectDescription, tools, dateOfDevelopment, links } = project;
    const projectIndex = portfolioData.projects.findIndex((item) => item.projectName === projectName) + 1;
    const githubLink = links?.github;
    const liveLink = links?.live;
    const hasGithubLink = Boolean(githubLink);
    const hasLiveLink = Boolean(liveLink);
    const hasProjectLinks = hasGithubLink || hasLiveLink;
    const fallbackCaseStudyLabel = `Case Study 0${projectIndex}`;

    return (
        <div className="glass-dark rounded-[var(--radius)] overflow-hidden group hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full">
            <div className="p-6 md:p-8 space-y-5 md:space-y-6 flex-grow">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <p className="section-label">{fallbackCaseStudyLabel}</p>
                        <h3 className="font-display text-2xl font-bold tracking-[-0.04em] text-foreground group-hover:text-primary transition-colors">
                            {projectName}
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                            {dateOfDevelopment.from} - {dateOfDevelopment.to}
                        </p>
                    </div>
                    <div className="p-2 glass rounded-xl text-primary">
                        <FolderOpenDot className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                    {projectDescription}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                    {tools.map((tool, index) => (
                        <span
                            key={index}
                            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-muted/50 text-primary border border-primary/10"
                        >
                            {tool}
                        </span>
                    ))}
                </div>
            </div>

            {hasProjectLinks ? (
                <div className="px-6 md:px-8 py-5 md:py-6 border-t border-border/50 bg-muted/20 flex flex-wrap items-center gap-5">
                    {hasGithubLink && (
                        <a
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                        >
                            Source
                            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                        </a>
                    )}
                    {hasLiveLink && (
                        <a
                            href={liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
                        >
                            Live Demo
                            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                        </a>
                    )}
                </div>
            ) : (
                <div className="px-6 md:px-8 py-5 md:py-6 border-t border-border/50 bg-muted/15">
                    <p className="text-sm text-muted-foreground">Case study available on request</p>
                </div>
            )}
        </div>
    );
};

export default ProjectCard;
