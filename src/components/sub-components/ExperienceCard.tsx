import type { PortfolioExperience } from '@/lib/portfolio';
import styles from '../Experience.module.css'

interface ExperienceCardProps {
    experience: PortfolioExperience
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
    const { companyName, position, dateOfEmployment, description } = experience;

    return (
        <article className={styles.experienceEntry}>
            <p className={styles.experiencePeriod}>
                {dateOfEmployment.from} - {dateOfEmployment.to}
            </p>
            <div className={styles.experienceIdentity}>
                <h3 className={styles.experienceRole}>
                    {position}
                </h3>
                <p className={styles.experienceCompany}>{companyName}</p>
            </div>

            {description && (
                <p className={styles.experienceDescription}>
                    {description}
                </p>
            )}
        </article>
    );
}
