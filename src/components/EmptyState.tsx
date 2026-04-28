import { Archive } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
    return (
        <div className="empty-state">
            <div className="empty-state__icon" aria-hidden="true">
                <Archive className="h-4 w-4" strokeWidth={1.8} />
            </div>
            <div className="space-y-2">
                <p className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {title}
                </p>
                <p className="mx-auto max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                    {description}
                </p>
            </div>
        </div>
    );
}
