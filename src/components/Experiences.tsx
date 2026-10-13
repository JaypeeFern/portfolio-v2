import { portfolioData } from '@/lib/portfolio'
import { MotionReveal } from './Motion'
import ExperienceCard from './sub-components/ExperienceCard'

export default function Experience() {
    const hasExperiences = portfolioData.experiences.length > 0

    return (
        <section id="experiences" className="folio-section experience-section">
            <div className="folio-section__intro">
                <h2>Experience</h2>
            </div>

            <MotionReveal>
                {hasExperiences ? (
                    <div className="experience-list">
                        {portfolioData.experiences.map((experience) => (
                            <ExperienceCard key={`${experience.companyName}-${experience.position}`} experience={experience} />
                        ))}
                    </div>
                ) : (
                    <p className="folio-empty-copy">No roles listed here yet.</p>
                )}
            </MotionReveal>
        </section>
    )
}
