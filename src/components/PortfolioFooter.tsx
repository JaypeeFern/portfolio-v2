import { ArrowUpRight } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import { portfolioData } from "@/lib/portfolio";
import styles from "./PortfolioFooter.module.css";

export default function PortfolioFooter() {
  const { about } = portfolioData;

  return (
    <footer className={styles.footer}>
      <div className={styles.edge} aria-hidden="true">
        <span className={styles.coralPlane} />
        <span className={styles.bluePlane} />
        <span className={`${styles.guide} ${styles.guideLeft}`} />
        <span className={`${styles.guide} ${styles.guideRight}`} />
        <span className={`${styles.crosshair} ${styles.crosshairLeft}`} />
        <span className={`${styles.crosshair} ${styles.crosshairRight}`} />
        <span className={styles.limeTab} />
      </div>

      <div className={styles.inner}>
        <div className={styles.main}>
          <a className={styles.identity} href="#page-top" aria-label={`${about.name}, back to top`}>
            <svg className={styles.mark} viewBox="0 0 46 32" aria-hidden="true">
              <path d="M4 3h20L14 29H0z" fill="#0849b0" />
              <path d="M26 3h20L36 29H16z" fill="#f86d49" />
            </svg>
            <span className={styles.identityText}>
              <span className={styles.name}>{about.name}</span>
              <span className={styles.role}>{about.role}</span>
            </span>
          </a>

          <nav className={styles.links} aria-label="Footer navigation">
            <a href="#work-list">Projects</a>
            <a href="#experiences">Experience</a>
            <a href="#contact">Contact</a>
          </nav>

          <nav className={styles.socials} aria-label="Social profiles">
            <a href={about.socialLinks.github} target="_blank" rel="noopener noreferrer">
              <BrandIcon name="github" className={styles.socialIcon} />
              <span>GitHub</span>
              <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
            </a>
            <a href={about.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <BrandIcon name="linkedin" className={styles.socialIcon} />
              <span>LinkedIn</span>
              <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
            </a>
          </nav>
        </div>

        <div className={styles.base}>
          <small>© {new Date().getFullYear()} {about.name}</small>
          <small>{about.location} · {about.timezone}</small>
          <a href="#page-top">
            <span>Back to top</span>
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </footer>
  );
}
