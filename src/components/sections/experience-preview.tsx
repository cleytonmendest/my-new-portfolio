'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Building2, ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import { experiences } from '@/data/experience';
import { getLocalizedText, getLocalizedArray } from '@/data/utils';
import Image from 'next/image';
import Link from 'next/link';

export function ExperiencePreview() {
  const t = useTranslations('experience');
  const locale = useLocale();

  // Show only the 2 most recent experiences
  const recentExperiences = experiences.slice(0, 2);

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
          {recentExperiences.map((item, index) => (
            <FadeIn key={index} delay={index * 0.2}>
              <Card className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-accent/10 flex items-center justify-center w-14 h-14 shrink-0">
                    {item.companyLogo ? (
                      <div className="relative w-10 h-10">
                        <Image
                          src={item.companyLogo}
                          alt={`${item.company} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <Building2 className="h-6 w-6 text-accent" />
                    )}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{item.position}</CardTitle>
                    <CardDescription className="text-lg mt-1">
                      {item.companyUrl ? (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors"
                        >
                          {item.company}
                        </a>
                      ) : (
                        item.company
                      )} • {getLocalizedText(item.period, locale)}
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

        {experiences.length > 2 && (
          <FadeIn delay={0.4}>
            <div className="mt-12 text-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/experience">
                  {t('viewAll')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
