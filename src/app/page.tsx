import Image from "next/image";
import { ArrowRight } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import Contact from "@/components/Contact";
import Experience from "@/components/Experiences";
import PortfolioFooter from "@/components/PortfolioFooter";
import Projects from "@/components/Projects";
import { TechnologyGroups, TechnologyOverflow } from "@/components/TechnologyWall";
import { portfolioData } from "@/lib/portfolio";

const skillGroups = [
  { id: "interfaces", title: "Frontend", skills: ["React", "Next.js", "Tailwind CSS"], capacity: 4 },
  { id: "applications", title: "Framework & language", skills: ["TypeScript", "NestJS", "Node.js"], capacity: 4 },
  {
    id: "backend",
    title: "Data, Infrastructure & Tools",
    skills: ["PostgreSQL", "MongoDB", "Firebase", "Docker", "Nginx", "Git"],
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
            <SkillList skills={group.skills} className={`skill-list skill-list--${group.id}`} />
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
        <a href="#work-list">Work</a>
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

  const identity = (
    <>
      <h1 className="hero-name">
        <span>{firstLine}</span>
        <span className="hero-name__accent">{lastLine}</span>
      </h1>
      <p className="hero-role">{about.role}</p>
      <p className="hero-headline">{about.headline}</p>
    </>
  );
  const details = (
    <>
      <p className="hero-description">{about.personalDescription}</p>
      <p className="hero-proof">{about.stats?.yearsBuilding} years building web products</p>
      <a className="hero-cta" href={about.ctaLinks?.[0]?.href ?? "#contact"}>
        {about.ctaLinks?.[0]?.label ?? "Get in touch"}
        <ArrowRight className="hero-cta__arrow" aria-hidden="true" strokeWidth={2} />
      </a>
    </>
  );

  if (!mobile) {
    return (
      <div className="hero-profile">
        {identity}
        {details}
      </div>
    );
  }

  return (
    <div className="mobile-profile">
      <div className="mobile-profile__identity">{identity}</div>
      <div className="mobile-profile__details">{details}</div>
    </div>
  );
}

function ProjectPreview({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className="projects-preview">
      <h2 id={mobile ? "mobile-projects-title" : "projects-title"}>
        <a href="#work-list">Projects</a>
      </h2>
    </div>
  );
}

export default function Home() {
  return (
    <div className="portfolio-page">
      <main className="relative" id="page-top">
        <section id="about" className="cutaway-desktop" aria-label="Introduction and technical range">
          <Image src="/plates/section-art.svg" alt="" fill priority sizes="100vw" className="cutaway-art" />
          <Image src="/plates/portrait.png" alt="Portrait of John Paul Fernandez" width={1024} height={1536} priority sizes="32vw" className="cutaway-portrait" />
          <PortfolioNav />
          <HeroContent />
          <TechnologyGroups groups={skillGroups} />
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

        <TechnologyOverflow groups={skillOverflow} />

        <Projects />

        <div className="lower-sections">
          <Experience />
        </div>

        <Contact />
      </main>

      <PortfolioFooter />
    </div>
  );
}
