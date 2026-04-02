import { portfolioData } from '@/lib/portfolio'
import ProjectCard from './sub-components/ProjectCard'

export default function Projects() {
    const hasProjects = portfolioData.projects.length > 0

    return (
        <section id="projects" className="section-container">
            <div className="space-y-7 md:space-y-8">
                <div className="space-y-3 md:space-y-4">
                    <p className="section-label">Selected Projects</p>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.04em]">
                        Work that shows how I think about
                        <span className="text-gradient"> product, systems, and polish.</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-base sm:text-lg">
                        A small set of projects chosen for how they solve problems, not just for the stack behind them.
                    </p>
                </div>

                {hasProjects ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                        {portfolioData.projects.map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="glass-dark rounded-[var(--radius)] border border-dashed border-border/80 px-6 py-10 text-center md:px-8">
                        <p className="font-display text-xl font-semibold tracking-[-0.03em] text-foreground">
                            No project data to show yet
                        </p>
                        <p className="mt-3 text-sm sm:text-base text-muted-foreground">
                            This section will show selected projects once they are added to the portfolio data.
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}
