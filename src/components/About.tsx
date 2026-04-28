import {
    ArrowRight,
    CalendarDays,
    Code2,
    Download,
    Grid2X2,
    Globe2,
    Handshake,
    Mail,
    Sparkles,
} from "lucide-react";
import Image from "next/image";
import portraitImage from "../../public/portrait.jpg";
import { getInitials } from "@/lib/format";
import { portfolioData } from "@/lib/portfolio";
import AvailabilityStatusBadge from "./AvailabilityStatusBadge";
import BrandIcon from "./BrandIcon";
import { MotionItem, MotionReveal, MotionStagger } from "./Motion";
import SkillMarquee from "./SkillMarquee";

const helpItems = [
    {
        icon: Sparkles,
        value: "Build polished web apps",
        label: "Responsive, accessible interfaces that feel clear and intentional.",
    },
    {
        icon: Handshake,
        value: "Connect product to code",
        label: "I care about the user journey, not just the component tree.",
    },
    {
        icon: Code2,
        value: "Turn ideas into usable products",
        label: "I help shape rough concepts into clear, working experiences people can actually use.",
    },
];
const identityStats = [
    {
        icon: CalendarDays,
        label: "Years building web products",
    },
    {
        icon: Grid2X2,
        label: "Projects completed",
    },
];

export default function About() {
    const about = portfolioData.about;
    const hasSkills = portfolioData.skills.length > 0;
    const ctaLinks = about.ctaLinks ?? [];
    const primaryCta = ctaLinks[0];
    const locationLabel = [about.timezone, "Available"].filter(Boolean).join(" / ");
    const yearsBuilding = about.stats?.yearsBuilding ?? "0";
    const projectsCompleted = String(portfolioData.projects.length);
    const stats = [
        {
            ...identityStats[0],
            value: yearsBuilding,
        },
        {
            ...identityStats[1],
            value: projectsCompleted,
        },
        {
            icon: Globe2,
            value: about.location ?? "Philippines",
            label: locationLabel,
        },
    ];

    return (
        <section id="about" className="hero-section">
            <div className="section-container hero-grid">
                <MotionStagger className="hero-copy">
                    <MotionItem>
                        <p className="section-label">{getInitials(about.name)} / {about.role}</p>
                    </MotionItem>

                    <MotionItem className="space-y-4">
                        <div>
                            <h1 className="hero-name">
                                {about.name}
                            </h1>
                            <p className="mt-4 font-display text-2xl font-semibold text-primary sm:text-3xl">
                                {about.role}
                            </p>
                        </div>
                    </MotionItem>

                    {about.headline && (
                        <MotionItem>
                            <p className="hero-headline">
                                {about.headline}
                            </p>
                        </MotionItem>
                    )}

                    <MotionItem>
                        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                            {about.personalDescription}
                        </p>
                    </MotionItem>

                    {hasSkills && (
                        <MotionItem>
                            <SkillMarquee skills={portfolioData.skills} />
                        </MotionItem>
                    )}

                    <MotionItem>
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            {primaryCta && (
                                <a href={primaryCta.href} className="button-primary">
                                    {primaryCta.label}
                                    <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                                </a>
                            )}
                            {about.resumeUrl ? (
                                <a href={about.resumeUrl} className="button-ghost" download>
                                    Download CV
                                    <Download className="h-4 w-4" strokeWidth={1.8} />
                                </a>
                            ) : (
                                <button type="button" className="button-ghost" disabled title="CV not published yet">
                                    Download CV
                                    <Download className="h-4 w-4" strokeWidth={1.8} />
                                </button>
                            )}
                        </div>
                    </MotionItem>
                </MotionStagger>

                <MotionReveal className="hero-proof" delay={0.16}>
                    <div className="hero-identity">
                        <div className="identity-card">
                            <div className="identity-portrait" aria-label="Portrait of John Paul Fernandez">
                                <Image
                                    src={portraitImage}
                                    alt="Portrait of John Paul Fernandez"
                                    width={900}
                                    height={1125}
                                    priority
                                    className="identity-portrait__image"
                                />
                                <span className="identity-portrait__corner identity-portrait__corner--top" aria-hidden="true" />
                                <span className="identity-portrait__corner identity-portrait__corner--bottom" aria-hidden="true" />
                                <span className="identity-portrait__scan" aria-hidden="true" />
                            </div>

                            <div className="identity-status">
                                <div className="flex items-center gap-3">
                                    <AvailabilityStatusBadge />
                                    <p className="ps-1 identity-status__label">{about.statusLabel ?? "Available"}</p>
                                </div>

                                <div>
                                    <h2 className="identity-status__title">
                                        {about.currentStatus}
                                    </h2>
                                </div>

                                <div className="divider" />

                                <div className="identity-contact-list">
                                    {about.contactEmail && (
                                        <a
                                            href={`mailto:${about.contactEmail}`}
                                            className="contact-link"
                                        >
                                            <Mail className="h-5 w-5 text-foreground" strokeWidth={1.8} />
                                            Contact Email
                                        </a>
                                    )}
                                    <a
                                        href={about.socialLinks.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-link"
                                    >
                                        <BrandIcon name="linkedin" className="h-5 w-5" useBrandColor />
                                        LinkedIn
                                    </a>
                                    <a
                                        href={about.socialLinks.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-link"
                                    >
                                        <BrandIcon name="github" className="h-5 w-5" useBrandColor />
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="identity-help-card">
                            <div className="identity-help-main">
                                <div className="section-heading-line">
                                    <h2>How I Can Help</h2>
                                </div>

                                <div className="identity-help-list">
                                    {helpItems.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div key={item.value} className="glance-item">
                                                <Icon className="h-5 w-5 text-primary" strokeWidth={1.8} />
                                                <div>
                                                    <p className="glance-value">{item.value}</p>
                                                    <p>{item.label}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="identity-stat-list">
                                {stats.map((stat) => {
                                    const Icon = stat.icon;

                                    return (
                                        <div key={stat.value} className="identity-stat">
                                            <Icon className="h-6 w-6 text-primary" strokeWidth={1.8} />
                                            <div>
                                                <p className="identity-stat__value">{stat.value}</p>
                                                <p>{stat.label}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </MotionReveal>
            </div>
        </section>
    );
}
