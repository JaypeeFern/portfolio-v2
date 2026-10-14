"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import BrandIcon from "@/components/BrandIcon";
import { EntranceDiv, EntranceSubheading } from "@/components/Motion";

export type TechnologyGroup = {
  id: string;
  title: string;
  skills: string[];
  capacity: number;
};

function SkillList({ skills, className = "skill-list" }: { skills: string[]; className?: string }) {
  return (
    <ul className={className}>
      {skills.map((skill) => (
        <li className="skill-item" key={skill}>
          <BrandIcon name={skill} className="skill-item__icon" />
          <span>{skill}</span>
        </li>
      ))}
    </ul>
  );
}

function WallCarousel({ group }: { group: TechnologyGroup }) {
  const prefersReducedMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const shouldRotate = prefersReducedMotion !== true && !isHovered && !isFocused && isVisible && isDocumentVisible;

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1 });

    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateDocumentVisibility = () => setIsDocumentVisible(!document.hidden);

    updateDocumentVisibility();
    document.addEventListener("visibilitychange", updateDocumentVisibility);
    return () => document.removeEventListener("visibilitychange", updateDocumentVisibility);
  }, []);

  useEffect(() => {
    if (!shouldRotate) return;

    const intervalId = window.setInterval(() => {
      const carousel = carouselRef.current;
      if (
        !carousel ||
        carousel.matches(":hover") ||
        carousel.contains(document.activeElement) ||
        document.hidden
      ) {
        return;
      }

      setStartIndex((currentIndex) => (currentIndex + 1) % group.skills.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [group.skills.length, shouldRotate]);

  const visibleSkills = Array.from(
    { length: group.capacity },
    (_, slotIndex) => group.skills[(startIndex + slotIndex) % group.skills.length],
  );

  return (
    <div
      ref={carouselRef}
      className={`skill-list skill-list--${group.id} skill-wall-carousel`}
      role="group"
      aria-label={`${group.title} technologies. Focus or hover to pause rotation.`}
      tabIndex={0}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(event) => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          setIsFocused(false);
        }
      }}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.ul
          key={startIndex}
          className="skill-wall-carousel__window"
          aria-hidden="true"
          initial={{ transform: "translateX(4%)", opacity: 0.55 }}
          animate={{ transform: "translateX(0%)", opacity: 1 }}
          exit={{ transform: "translateX(-4%)", opacity: 0.55 }}
          transition={{ duration: 0.28, ease: [0.77, 0, 0.175, 1] }}
        >
          {visibleSkills.map((skill) => (
            <li className="skill-item" key={skill}>
              <BrandIcon name={skill} className="skill-item__icon" />
              <span>{skill}</span>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
      <ul className="skill-wall-carousel__accessible-list" aria-label="All technologies in this group">
        {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
      </ul>
    </div>
  );
}

export function TechnologyGroups({ groups }: { groups: TechnologyGroup[] }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="capability-flow">
      {groups.map((group) => (
        <section className={`skill-cluster skill-cluster--${group.id}`} key={group.id} aria-labelledby={`${group.id}-title`}>
          <EntranceDiv className={`skill-cluster__plane skill-cluster__plane--${group.id}`} intro="technology">
            <EntranceSubheading id={`${group.id}-title`} className={`skill-cluster__title skill-cluster__title--${group.id}`} aria-label={group.title}>
              {group.id === "backend" ? (
                <>
                  Data,
                  <br />
                  Infrastructure
                  <br />
                  &amp; Tools
                </>
              ) : (
                group.title
              )}
            </EntranceSubheading>
            {group.skills.length > group.capacity && prefersReducedMotion !== true ? (
              <WallCarousel group={group} />
            ) : (
              <SkillList
                skills={group.skills.slice(0, group.capacity)}
                className={`skill-list skill-list--${group.id}${group.skills.length === 3 ? " skill-list--three" : ""}`}
              />
            )}
          </EntranceDiv>
        </section>
      ))}
    </div>
  );
}

export function TechnologyOverflow({ groups }: { groups: TechnologyGroup[] }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion !== true || groups.length === 0) return null;

  return (
    <section className="capability-continuation capability-continuation--motion-fallback" aria-label="Additional technologies">
      {groups.map((group) => (
        <section className="continuation-group" key={group.id}>
          <h2>{group.title}, continued</h2>
          <SkillList skills={group.skills} className="skill-list skill-list--continuation" />
        </section>
      ))}
    </section>
  );
}
