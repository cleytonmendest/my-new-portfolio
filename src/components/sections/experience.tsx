'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, CheckCircle2 } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import { experiences } from '@/data/experience';
import { getLocalizedText, getLocalizedArray } from '@/data/utils';

export function Experience() {
  const t = useTranslations('experience');
  const locale = useLocale();

  return (
    <section className="py-20 px-4" id="experience">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t('title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>
        </FadeIn>

        <div className="space-y-8">
          {experiences.map((item, index) => (
            <FadeIn key={index} delay={index * 0.2}>
              <Card className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Briefcase className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{item.position}</CardTitle>
                    <CardDescription className="text-lg mt-1">
                      {item.company} • {getLocalizedText(item.period, locale)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {getLocalizedText(item.description, locale)}
                </p>
                <div className="space-y-2">
                  <p className="font-semibold text-sm">Key Achievements:</p>
                  <ul className="space-y-2">
                    {getLocalizedArray(item.achievements, locale).map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
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
