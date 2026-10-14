import { SkillCategory } from './types';

// `core` marks tools used in client work (see experience and projects).
export const skillsData: SkillCategory[] = [
  {
    category: 'ecommerce',
    skills: [
      { name: 'VTEX IO', core: true },
      { name: 'Shopify', core: true },
      { name: 'Deco.cx', core: true },
    ],
  },
  {
    category: 'frontend',
    skills: [
      { name: 'React', core: true },
      { name: 'Next.js' },
      { name: 'TypeScript', core: true },
      { name: 'JavaScript', core: true },
      { name: 'Tailwind CSS', core: true },
      { name: 'Sass', core: true },
      { name: 'HTML5' },
      { name: 'CSS3' },
    ],
  },
  {
    category: 'backend',
    skills: [
      { name: 'Ruby', core: true },
      { name: 'Ruby on Rails', core: true },
      { name: 'Node.js', core: true },
      { name: 'Express' },
      { name: 'NestJS' },
      { name: 'GraphQL' },
    ],
  },
  {
    category: 'database',
    skills: [{ name: 'PostgreSQL' }, { name: 'MongoDB' }, { name: 'Redis' }, { name: 'MySQL' }],
  },
  {
    category: 'tools',
    skills: [{ name: 'Git' }, { name: 'Docker' }, { name: 'Jest' }, { name: 'Supabase' }, { name: 'Webpack' }],
  },
];
