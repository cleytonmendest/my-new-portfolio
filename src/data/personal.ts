import { PersonalInfo, SocialLink } from './types';

export const personalInfo: PersonalInfo = {
  name: 'Cleyton Mendes',
  title: 'Software Engineer',
  bio: 'Software Engineer with 4+ years of experience specializing in e-commerce solutions. Expert in React, TypeScript, Node.js, and modern web technologies. Passionate about building scalable applications and delivering exceptional user experiences.',
  email: 'cleyton.mendest@gmail.com',
  phone: '+5521974219271',
  location: {
    city: 'Rio de Janeiro',
    state: 'RJ',
    country: 'Brazil',
  },
  availability: 'Open to remote opportunities',
};

export const socialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/cleytonmendest',
    icon: 'github',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/cleyton-mendes',
    icon: 'linkedin',
  },
];

export const stats = {
  yearsOfExperience: 4,
  projectsCompleted: 50,
};
