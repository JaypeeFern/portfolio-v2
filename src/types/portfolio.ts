export interface PortfolioDateRange {
  from: string;
  to: string;
}

export interface PortfolioAbout {
  name: string;
  role: string;
  headline?: string;
  personalDescription: string;
  location?: string;
  timezone?: string;
  resumeUrl?: string;
  contactEmail?: string;
  ctaLinks?: PortfolioCtaLink[];
  highlights?: PortfolioHighlight[];
  socialLinks: {
    linkedin: string;
    github: string;
  };
  currentStatus: string;
  statusLabel?: string;
}

export interface PortfolioCtaLink {
  label: string;
  href: string;
}

export interface PortfolioHighlight {
  label: string;
  value: string;
  description?: string;
}

export interface PortfolioExperience {
  position: string;
  companyName: string;
  dateOfEmployment: PortfolioDateRange;
  description: string;
}

export interface PortfolioProjectLinks {
  github?: string;
  live?: string;
}

export interface PortfolioProject {
  projectName: string;
  projectDescription: string;
  tools: string[];
  dateOfDevelopment: PortfolioDateRange;
  links?: PortfolioProjectLinks;
}

export interface PortfolioMetadata {
  url?: string;
}

export interface PortfolioData {
  about: PortfolioAbout;
  experiences: PortfolioExperience[];
  skills: string[];
  projects: PortfolioProject[];
  metadata: PortfolioMetadata;
}
