'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/motion/fade-in';
import { skillsData } from '@/data/skills';

export function Skills() {
  const t = useTranslations('skills');

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
          {skillsData.map((categoryData, index) => (
            <FadeIn key={categoryData.category} delay={index * 0.1}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {t(`categories.${categoryData.category}`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-wrap gap-2">
                    {categoryData.skills.map((skill) => (
                      <li key={skill}>
                        <Badge variant="secondary">{skill}</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
