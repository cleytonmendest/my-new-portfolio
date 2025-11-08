'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Skills() {
  const t = useTranslations('skills');

  const skillsData = {
    frontend: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Vue.js',
      'Tailwind CSS',
      'HTML5',
      'CSS3',
    ],
    backend: [
      'Node.js',
      'Express',
      'NestJS',
      'Python',
      'REST API',
      'GraphQL',
    ],
    database: [
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'MySQL',
      'Firebase',
    ],
    tools: [
      'Git',
      'Docker',
      'CI/CD',
      'AWS',
      'Vercel',
      'Jest',
      'Webpack',
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
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t('title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Card key={category.key}>
              <CardHeader>
                <CardTitle className="text-xl">
                  {t(`categories.${category.key}`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm py-1.5 px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
