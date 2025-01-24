import portfolioData from '../../portfolio.json'
import ProjectCard from './sub-components/ProjectCard'

export default function Projects() {
    return (
        <section id="projects">
            {portfolioData?.projects?.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </section>
    )
}