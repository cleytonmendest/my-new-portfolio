import { PersonalInfo, SocialLink } from './types';

export const personalInfo: PersonalInfo = {
  name: 'Cleyton Mendes',
  title: 'Software Engineer',
  bio: 'Software Engineer specializing in e-commerce solutions since 2021. Expert in React, TypeScript, Node.js, and modern web technologies. Passionate about building scalable applications and delivering exceptional user experiences.',
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
