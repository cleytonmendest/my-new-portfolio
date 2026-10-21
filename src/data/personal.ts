import { PersonalInfo, SocialLink } from './types';

export const personalInfo: PersonalInfo = {
  name: 'Cleyton Mendes',
  title: 'Software Engineer',
  email: 'cleyton.mendest@gmail.com',
  phone: '+5521974219271',
  location: {
    city: 'Rio de Janeiro',
    state: 'RJ',
    country: 'Brazil',
  },
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
  yearsOfExperience: 5,
};

/** Brands I shipped storefronts for (see experience and projects). */
export const brands = ['Tiffany & Co.', 'Hugo Boss', 'Vitaminese', 'Ultrafeu', 'Creamy', 'Candide'];
