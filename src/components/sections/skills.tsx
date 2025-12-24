'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn } from '@/components/fade-in';
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {t(`categories.${categoryData.category}`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {categoryData.skills.map((skill) => {
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
