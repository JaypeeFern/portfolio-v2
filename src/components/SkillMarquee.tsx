'use client'

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import BrandIcon from "./BrandIcon";

interface SkillMarqueeProps {
    skills: string[];
}

export default function SkillMarquee({ skills }: SkillMarqueeProps) {
    const [emblaRef] = useEmblaCarousel(
        {
            align: "start",
            containScroll: false,
            dragFree: true,
            loop: true,
            skipSnaps: true,
        },
        [
            AutoScroll({
                direction: "forward",
                playOnInit: true,
                speed: 0.65,
                startDelay: 0,
                stopOnFocusIn: true,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
            }),
        ],
    );

    if (skills.length === 0) {
        return null;
    }

    return (
        <div ref={emblaRef} className="skill-marquee" aria-label="Featured skills">
            <ul className="skill-strip">
                {skills.map((skill) => (
                    <li key={skill} className="skill-slide">
                        <span className="skill-pill">
                            <BrandIcon name={skill} className="h-5 w-5" useBrandColor />
                            {skill}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
