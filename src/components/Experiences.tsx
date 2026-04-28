import { portfolioData } from '@/lib/portfolio'
import EmptyState from './EmptyState'
import { MotionReveal } from './Motion'
import ExperienceCard from './sub-components/ExperienceCard'

export default function Experience() {
    const hasExperiences = portfolioData.experiences.length > 0

    return (
        <section id="experiences" className="section-container section-block">
            <div className="max-w-3xl space-y-3">
                <p className="section-label">Experience</p>
                <h2 className="font-display text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl">
                    Experience
                </h2>
            </div>

            <MotionReveal>
                {hasExperiences ? (
                    <div className="space-y-5">
                        {portfolioData.experiences.map((experience) => (
                            <ExperienceCard key={`${experience.companyName}-${experience.position}`} experience={experience} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title="Role history is not listed yet"
                        description="This section is reserved for verified work experience, responsibilities, and dates once they are ready to share."
                    />
                )}
            </MotionReveal>
        </section>
    )
}
