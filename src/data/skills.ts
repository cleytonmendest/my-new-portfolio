import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiGraphql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiMysql,
  SiGit,
  SiDocker,
  SiJest,
  SiSupabase,
  SiWebpack,
} from 'react-icons/si';
import { SkillCategory } from './types';

export const skillsData: SkillCategory[] = [
  {
    category: 'frontend',
    skills: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss3 },
      { name: 'Sass', icon: SiSass },
    ],
  },
  {
    category: 'backend',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express', icon: SiExpress },
      { name: 'NestJS', icon: SiNestjs },
      { name: 'GraphQL', icon: SiGraphql },
    ],
  },
  {
    category: 'database',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Redis', icon: SiRedis },
      { name: 'MySQL', icon: SiMysql },
    ],
  },
  {
    category: 'tools',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'Docker', icon: SiDocker },
      { name: 'Jest', icon: SiJest },
      { name: 'Supabase', icon: SiSupabase },
      { name: 'Webpack', icon: SiWebpack },
    ],
  },
];
