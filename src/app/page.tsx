import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import Contact from "@/components/Contact";
import Experience from "@/components/Experiences";
import { portfolioData } from "@/lib/portfolio";

const skillGroups = [
  { id: "interfaces", title: "Interfaces", skills: ["React", "Tailwind CSS"], capacity: 4 },
  { id: "applications", title: "Applications", skills: ["Next.js", "TypeScript"], capacity: 4 },
  {
    id: "backend",
    title: "Backend systems",
    skills: ["Node.js", "NestJS", "PostgreSQL", "MongoDB", "Docker", "Git", "Firebase", "Nginx"],
    capacity: 8,
  },
].map((group) => ({
  ...group,
  skills: group.skills.filter((skill) => portfolioData.skills.includes(skill)),
}));

const categorizedSkills = new Set(skillGroups.flatMap((group) => group.skills));
const uncategorizedSkills = portfolioData.skills.filter((skill) => !categorizedSkills.has(skill));
const displayGroups = uncategorizedSkills.length
  ? [...skillGroups, { id: "tools", title: "More in the stack", skills: uncategorizedSkills, capacity: 8 }]
  : skillGroups;

const skillOverflow = displayGroups.flatMap((group) => {
  const overflow = group.skills.slice(group.capacity);
  return overflow.length ? [{ ...group, skills: overflow }] : [];
});

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

function CapabilityGroups({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={mobile ? "mobile-capabilities" : "capability-flow"}>
      {skillGroups.map((group) => (
        <section className={`skill-cluster skill-cluster--${group.id}`} key={group.id} aria-labelledby={`${group.id}-title${mobile ? "-mobile" : ""}`}>
          <div className={`skill-cluster__plane skill-cluster__plane--${group.id}`}>
            <h2 id={`${group.id}-title${mobile ? "-mobile" : ""}`} className={`skill-cluster__title skill-cluster__title--${group.id}`}>
              {group.title}
            </h2>
            <SkillList skills={group.skills.slice(0, group.capacity)} className={`skill-list skill-list--${group.id}`} />
          </div>
        </section>
      ))}
      {uncategorizedSkills.length > 0 && (
        <section className="skill-cluster skill-cluster--tools" aria-labelledby={`tools-title${mobile ? "-mobile" : ""}`}>
          <h2 id={`tools-title${mobile ? "-mobile" : ""}`} className="skill-cluster__title">More in the stack</h2>
          <SkillList skills={uncategorizedSkills} />
        </section>
      )}
    </div>
  );
}

function PortfolioNav({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav className="folio-nav" aria-label="Main navigation">
      <a className="folio-mark" href={mobile ? "#mobile-about" : "#about"} aria-label="John Paul Fernandez, home">
        <svg viewBox="0 0 46 32" aria-hidden="true">
          <path d="M4 3h20L14 29H0z" fill="#0849b0" />
          <path d="M26 3h20L36 29H16z" fill="#f86d49" />
        </svg>
      </a>
      <div className="folio-nav__links">
        <a href={mobile ? "#mobile-about" : "#about"}>About</a>
        <a href={mobile ? "#mobile-projects" : "#projects"}>Work</a>
        <a href="#experiences">Experience</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

function HeroContent({ mobile = false }: { mobile?: boolean }) {
  const { about } = portfolioData;
  const nameParts = about.name.split(" ");
  const firstLine = nameParts.slice(0, -1).join(" ");
  const lastLine = nameParts.at(-1);

  return (
    <div className={mobile ? "mobile-profile" : "hero-profile"}>
      <h1 className="hero-name">
        <span>{firstLine}</span>
        <span className="hero-name__accent">{lastLine}</span>
      </h1>
      <p className="hero-role">{about.role}</p>
      <p className="hero-headline">{about.headline}</p>
      <p className="hero-description">{about.personalDescription}</p>
      <p className="hero-proof">{about.stats?.yearsBuilding} years building web products</p>
      <a className="hero-cta" href={about.ctaLinks?.[0]?.href ?? "#contact"}>
        {about.ctaLinks?.[0]?.label ?? "Get in touch"}
        <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
      </a>
    </div>
  );
}

function ProjectPreview({ mobile = false }: { mobile?: boolean }) {
  const hasProjects = portfolioData.projects.length > 0;

  return (
    <section id={mobile ? "mobile-projects" : "projects"} className="projects-preview" aria-labelledby={mobile ? "mobile-projects-title" : "projects-title"}>
      <h2 id={mobile ? "mobile-projects-title" : "projects-title"}>Selected projects</h2>
      <div className="projects-preview__status">
        {hasProjects ? (
          <a href="#work-list">Browse {portfolioData.projects.length} projects <ArrowUpRight aria-hidden="true" size={16} /></a>
        ) : (
          <p><strong>No project writeups yet.</strong></p>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="portfolio-page">
      <section id="about" className="cutaway-desktop" aria-label="Introduction and technical range">
        <Image src="/plates/section-art.svg" alt="" fill priority sizes="100vw" className="cutaway-art" />
        <Image src="/plates/portrait.png" alt="Portrait of John Paul Fernandez" width={1024} height={1536} priority sizes="32vw" className="cutaway-portrait" />
        <PortfolioNav />
        <HeroContent />
        <CapabilityGroups />
        <ProjectPreview />
      </section>

      <section id="mobile-about" className="cutaway-mobile" aria-label="Introduction and technical range">
        <div className="mobile-visual">
          <div className="mobile-visual__art" aria-hidden="true" />
          <Image src="/plates/portrait.png" alt="Portrait of John Paul Fernandez" width={1024} height={1536} priority sizes="42vw" className="mobile-visual__portrait" />
          <PortfolioNav mobile />
        </div>
        <HeroContent mobile />
        <CapabilityGroups mobile />
        <ProjectPreview mobile />
      </section>

      {skillOverflow.length > 0 && (
        <section className="capability-continuation" aria-label="Additional technologies">
          {skillOverflow.map((group) => (
            <section className="continuation-group" key={group.id}>
              <h2>{group.title}, continued</h2>
              <SkillList skills={group.skills} className={`skill-list skill-list--${group.id}`} />
            </section>
          ))}
        </section>
      )}

      <div className="lower-sections">
        <Experience />
        <Contact />
        <footer className="folio-footer">© {new Date().getFullYear()} {portfolioData.about.name}</footer>
      </div>
    </div>
  );
}
