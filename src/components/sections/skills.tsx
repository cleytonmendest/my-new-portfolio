'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn } from '@/components/fade-in';
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
import { IconType } from 'react-icons';

interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

export function Skills() {
  const t = useTranslations('skills');

  const skillsData: Record<string, Skill[]> = {
    frontend: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: 'currentColor' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
      { name: 'Sass', icon: SiSass, color: '#CC6699' },
    ],
    backend: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express', icon: SiExpress, color: 'currentColor' },
      { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
      { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
    ],
    database: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Redis', icon: SiRedis, color: '#DC382D' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    ],
    tools: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Jest', icon: SiJest, color: '#C21325' },
      { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
      { name: 'Webpack', icon: SiWebpack, color: '#8DD6F9' },
    ],
  };

  const categories = [
    { key: 'frontend', skills: skillsData.frontend },
    { key: 'backend', skills: skillsData.backend },
    { key: 'database', skills: skillsData.database },
    { key: 'tools', skills: skillsData.tools },
  ];

  return (
    <section className="py-20 px-4" id="skills">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t('title')}
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <FadeIn key={category.key} delay={index * 0.1}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {t(`categories.${category.key}`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {category.skills.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                        >
                          <Icon
                            className="h-8 w-8 transition-transform group-hover:scale-110"
                            style={{ color: skill.color }}
                          />
                          <span className="text-xs text-center font-medium text-muted-foreground">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
