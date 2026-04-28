import type { PortfolioExperience } from '@/lib/portfolio';

interface ExperienceCardProps {
    experience: PortfolioExperience
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
    const { companyName, position, dateOfEmployment, description } = experience;

    return (
        <article className="timeline-card">
            <div>
                <p className="section-label">
                    {dateOfEmployment.from} - {dateOfEmployment.to}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-normal text-foreground">
                    {position}
                </h3>
                <p className="mt-1 text-primary">{companyName}</p>
            </div>

            {description && (
                <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                    {description}
                </p>
            )}
        </article>
    );
}
