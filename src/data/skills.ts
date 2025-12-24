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
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: 'currentColor' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
      { name: 'Sass', icon: SiSass, color: '#CC6699' },
    ],
  },
  {
    category: 'backend',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express', icon: SiExpress, color: 'currentColor' },
      { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
      { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
    ],
  },
  {
    category: 'database',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Redis', icon: SiRedis, color: '#DC382D' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    ],
  },
  {
    category: 'tools',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Jest', icon: SiJest, color: '#C21325' },
      { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
      { name: 'Webpack', icon: SiWebpack, color: '#8DD6F9' },
    ],
  },
];
