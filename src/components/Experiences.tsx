import { portfolioData } from '@/lib/portfolio'
import ExperienceCard from './sub-components/ExperienceCard'

export default function Experience() {
    const hasExperiences = portfolioData.experiences.length > 0

    return (
        <section id="experiences" className="section-container">
            <div className="space-y-7 md:space-y-8">
                <div className="space-y-3 md:space-y-4">
                    <p className="section-label">Experience</p>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.04em]">
                        The way I work is shaped by
                        <span className="text-gradient"> building, iterating, and shipping.</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-base sm:text-lg">
                        I am still early in my career, so this section focuses on real work patterns, project ownership, and continuous skill growth.
                    </p>
                </div>

                {hasExperiences ? (
                    <div className="space-y-5 md:space-y-6">
                        {portfolioData.experiences.map((experience, index) => (
                            <ExperienceCard key={index} experience={experience} />
                        ))}
                    </div>
                ) : (
                    <div className="glass-dark rounded-[var(--radius)] border border-dashed border-border/80 px-6 py-10 text-center md:px-8">
                        <p className="font-display text-xl font-semibold tracking-[-0.03em] text-foreground">
                            No experience data to show yet
                        </p>
                        <p className="mt-3 text-sm sm:text-base text-muted-foreground">
                            This section will show your work history once it is added to the portfolio data.
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}
