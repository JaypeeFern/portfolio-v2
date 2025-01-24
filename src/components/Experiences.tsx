import portfolioData from '../../portfolio.json'
import ExperienceCard from './sub-components/ExperienceCard'

export default function Experience() {
    return (
        <section id="experiences">
            {portfolioData.experiences.map((experience, index) => (
                <ExperienceCard key={index} experience={experience} />
            ))}
        </section>
    )
}