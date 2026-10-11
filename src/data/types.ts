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
  position: string;
  company: string;
  companyUrl?: string;
  period: LocalizedString;
  description: LocalizedString;
  achievements: LocalizedString[];
}

export type ProjectStatus = 'live' | 'maintenance' | 'offline';

export interface ProjectScreenshot {
  src: string;
  width: number;
  height: number;
}

export interface Project {
  name: string;
  description: LocalizedString;
  /** What the owner did on the project. */
  role: LocalizedString;
  platform: string;
  stack: string[];
  /** Client logo, shown until the section shows screenshots. */
  image: string;
  /** Static capture of the live site, saved under public/projects. */
  screenshot?: ProjectScreenshot;
  url: string;
  /** Only `live` projects link to the client's site. */
  status: ProjectStatus;
  featured?: boolean;
}

export interface SkillCategory {
  category: 'frontend' | 'platforms' | 'backend' | 'database' | 'tools';
  skills: string[];
}

export interface Certification {
  name: string;
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
