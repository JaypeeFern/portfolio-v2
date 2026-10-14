import { portfolioData } from '@/lib/portfolio'
import { MotionReveal } from './Motion'
import ProjectCard from './sub-components/ProjectCard'
import styles from './Projects.module.css'

export default function Projects() {
    const hasProjects = portfolioData.projects.length > 0

    return (
        <section id="work-list" className={styles.projectsSection} aria-label="Projects">
            <MotionReveal>
                {hasProjects ? (
                    <div className={styles.projectList}>
                        {portfolioData.projects.map((project) => (
                            <ProjectCard key={project.projectName} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.projectsEmptyState}>
                        <p className={styles.projectsEmptyStateText}>No projects published yet</p>
                    </div>
                )}
            </MotionReveal>
        </section>
    )
}
