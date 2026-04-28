import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Globe2,
    Layers3,
} from "lucide-react";
import { portfolioData } from "@/lib/portfolio";
import BrandIcon from "./BrandIcon";
import { MotionItem, MotionReveal, MotionStagger } from "./Motion";
import SkillMarquee from "./SkillMarquee";

const featuredSkillCount = 5;

function getInitials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 3)
        .toUpperCase();
}

export default function About() {
    const about = portfolioData.about;
    const featuredSkills = portfolioData.skills.slice(0, featuredSkillCount);
    const ctaLinks = about.ctaLinks ?? [];
    const hasLocation = Boolean(about.location);
    const hasTimezone = Boolean(about.timezone);
    const hasHighlights = Boolean(about.highlights?.length);
    const showAtAGlance = hasHighlights || hasLocation || hasTimezone || Boolean(about.currentStatus) || featuredSkills.length > 0;
    const primaryCta = ctaLinks[0];
    const focusText = featuredSkills.slice(0, 3).join(" / ");

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

                    {featuredSkills.length > 0 && (
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
                                    <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                                </a>
                            ) : (
                                <button type="button" className="button-ghost" disabled title="CV not published yet">
                                    Download CV
                                    <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                                </button>
                            )}
                        </div>
                    </MotionItem>
                </MotionStagger>

                <MotionReveal className="hero-proof" delay={0.16}>
                    {showAtAGlance && (
                        <div className="space-y-7">
                            <div className="section-heading-line">
                                <h2>At a glance</h2>
                            </div>

                            <div className="glance-grid">
                                {about.highlights?.map((highlight) => (
                                    <div key={`${highlight.label}-${highlight.value}`} className="glance-item">
                                        <CalendarDays className="h-5 w-5 text-primary" strokeWidth={1.8} />
                                        <div>
                                            <p className="glance-value">{highlight.value}</p>
                                            <p>{highlight.label}</p>
                                            {highlight.description && <p>{highlight.description}</p>}
                                        </div>
                                    </div>
                                ))}

                                {about.currentStatus && (
                                    <div className="glance-item">
                                        <CheckCircle2 className="h-5 w-5 text-primary" strokeWidth={1.8} />
                                        <div>
                                            <p className="glance-value">{about.statusLabel ?? "Status"}</p>
                                            <p>{about.currentStatus}</p>
                                        </div>
                                    </div>
                                )}

                                {hasLocation && (
                                    <div className="glance-item">
                                        <Globe2 className="h-5 w-5 text-primary" strokeWidth={1.8} />
                                        <div>
                                            <p className="glance-value">{about.location}</p>
                                            <p>Current location</p>
                                        </div>
                                    </div>
                                )}

                                {hasTimezone && (
                                    <div className="glance-item">
                                        <Clock3 className="h-5 w-5 text-primary" strokeWidth={1.8} />
                                        <div>
                                            <p className="glance-value">{about.timezone}</p>
                                            <p>Working timezone</p>
                                        </div>
                                    </div>
                                )}

                                {focusText && (
                                    <div className="glance-item">
                                        <Layers3 className="h-5 w-5 text-primary" strokeWidth={1.8} />
                                        <div>
                                            <p className="glance-value">Current focus</p>
                                            <p>{focusText}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div id="contact" className="contact-panel">
                        <div className="flex items-start gap-3">
                            <span className="status-dot status-dot--heading" aria-hidden="true" />
                            <div>
                                <h2 className="font-display text-xl font-semibold tracking-tight">
                                    {about.statusLabel ?? about.currentStatus}
                                </h2>
                                {about.statusLabel && (
                                    <p className="text-sm text-muted-foreground">{about.currentStatus}</p>
                                )}
                            </div>
                        </div>

                        <div className="divider" />

                        <div className="space-y-4">
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

                        <a href="#contact" className="contact-panel__action" aria-label="Go to contact form">
                            <span>Contact me</span>
                            <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
                        </a>
                    </div>
                </MotionReveal>
            </div>
        </section>
    );
}
