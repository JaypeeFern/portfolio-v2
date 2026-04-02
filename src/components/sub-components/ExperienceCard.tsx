import type { PortfolioExperience } from '@/lib/portfolio';

interface ExperienceCardProps {
    experience: PortfolioExperience
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
    const { companyName, position, dateOfEmployment, description } = experience;

    return (
        <div className="relative group">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border group-hover:bg-primary/50 transition-colors" />

            <div className="ml-6 sm:ml-8 glass-dark p-5 sm:p-6 md:p-8 rounded-[var(--radius)] space-y-4 hover:border-primary/30 transition-all hover:translate-x-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                        <p className="section-label">Role</p>
                        <h3 className="font-display text-xl font-bold tracking-[-0.03em] text-foreground group-hover:text-primary transition-colors">
                            {position}
                        </h3>
                        <p className="text-primary/80 font-medium">{companyName}</p>
                    </div>
                    <div className="w-fit text-sm font-medium text-muted-foreground bg-muted/20 px-3 py-1 rounded-full border border-border">
                        {dateOfEmployment.from} - {dateOfEmployment.to}
                    </div>
                </div>

                {description && (
                    <p className="text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                )}
            </div>

            <div className="absolute left-[-4px] top-7 sm:top-8 w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors ring-4 ring-background" />
        </div>
    );
};

export default ExperienceCard;
