import { ArrowRight } from 'lucide-react'
import { portfolioData } from '@/lib/portfolio'
import EmptyState from './EmptyState'
import { MotionReveal } from './Motion'
import ProjectCard from './sub-components/ProjectCard'

export default function Projects() {
    const hasProjects = portfolioData.projects.length > 0

    return (
        <section id="projects" className="section-container section-block">
            <div className="section-heading-line">
                <h2>Selected Work</h2>
                {hasProjects && (
                    <a href="#projects" className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:gap-3">
                        View all projects
                        <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                    </a>
                )}
            </div>

            <MotionReveal>
                {hasProjects ? (
                    <div className="project-grid">
                        {portfolioData.projects.map((project) => (
                            <ProjectCard key={project.projectName} project={project} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title="Project writeups are not published yet"
                        description="Selected work will appear here once each project has enough context to show the problem, decisions, and outcome clearly."
                    />
                )}
            </MotionReveal>
        </section>
    )
}
