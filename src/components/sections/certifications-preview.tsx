'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Award, ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import { certifications } from '@/data/certifications';
import { education } from '@/data/education';
import Link from 'next/link';

export function CertificationsPreview() {
  const t = useTranslations('certifications');
  const locale = useLocale() as 'en' | 'pt';

  return (
    <section className="py-20 px-4" id="certifications">
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

        {/* Education Section - Full Display */}
        {education.length > 0 && (
          <div className="mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <Card className="flex flex-col h-full hover:shadow-lg transition-shadow group">
                    <CardHeader>
                      <div className="flex items-start gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <GraduationCap className="h-5 w-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg group-hover:text-accent transition-colors">
                            {edu.degree[locale]}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {edu.institutionUrl ? (
                              <a
                                href={edu.institutionUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-accent transition-colors"
                              >
                                {edu.institution}
                              </a>
                            ) : (
                              edu.institution
                            )}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {edu.period[locale]}
                          </Badge>
                          <Badge
                            variant={edu.status === 'completed' ? 'default' : 'outline'}
                            className="text-xs"
                          >
                            {edu.status === 'completed'
                              ? locale === 'en'
                                ? 'Completed'
                                : 'Concluído'
                              : locale === 'en'
                                ? 'In Progress'
                                : 'Em Andamento'}
                          </Badge>
                        </div>
                        {edu.description && (
                          <p className="text-sm text-muted-foreground">
                            {edu.description[locale]}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Summary */}
        {certifications.length > 0 && (
          <FadeIn delay={0.2}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        {t('certifications')}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {locale === 'en'
                          ? 'Professional development courses and certifications'
                          : 'Cursos de desenvolvimento profissional e certificações'}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {certifications.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {certifications.slice(0, 3).map((cert, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {cert.issuer}
                    </Badge>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full gap-2">
                  <Link href="/education">
                    {t('viewAllCertifications')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
