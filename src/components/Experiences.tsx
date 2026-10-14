import { portfolioData } from '@/lib/portfolio'
import { MotionReveal } from './Motion'
import ExperienceCard from './sub-components/ExperienceCard'
import styles from './Experience.module.css'

export default function Experience() {
    const hasExperiences = portfolioData.experiences.length > 0

    return (
        <section id="experiences" className={`folio-section ${styles.experienceSection}`}>
            <div className={`folio-section__intro ${styles.experienceIntro}`}>
                <h2>Experience</h2>
            </div>

            <MotionReveal>
                {hasExperiences ? (
                    <div className={styles.experienceList}>
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
