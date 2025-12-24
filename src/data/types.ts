import { IconType } from 'react-icons';

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

export interface Project {
  name: string;
  description: LocalizedString;
  technologies: string[];
  image: string;
  bgColor: string;
  url: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

export interface SkillCategory {
  category: 'frontend' | 'backend' | 'database' | 'tools';
  skills: Skill[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
