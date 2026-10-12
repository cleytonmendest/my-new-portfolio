// Helper type for bilingual content
export type LocalizedString = {
  en: string;
  pt: string;
};

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  availability: string;
}

export interface Experience {
  position: LocalizedString;
  company: string;
  companyUrl?: string;
  companyLogo?: string;
  period: LocalizedString;
  description: LocalizedString;
  achievements: LocalizedString[];
}

export interface ProjectScreenshots {
  desktop?: string;
  mobile?: string;
  /** ISO date the live site was captured, shown under the gallery. */
  capturedAt: string;
}

export interface Project {
  /** URL segment for /projects/[slug]; also the folder name under content/projects. */
  slug: string;
  name: string;
  description: LocalizedString;
  technologies: string[];
  /** Logo shown on the card. */
  image: string;
  url: string;
  featured?: boolean;
  screenshots?: ProjectScreenshots;
}

export interface Skill {
  name: string;
  /** Used in client work (see experience and projects); marked in the stack legend. */
  core?: boolean;
}

export interface SkillCategory {
  category: 'ecommerce' | 'frontend' | 'backend' | 'database' | 'tools';
  skills: Skill[];
}

export interface Certification {
  name: LocalizedString;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
}

export interface Education {
  degree: LocalizedString;
  institution: string;
  institutionUrl?: string;
  period: LocalizedString;
  status: 'completed' | 'in-progress';
  description?: LocalizedString;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
