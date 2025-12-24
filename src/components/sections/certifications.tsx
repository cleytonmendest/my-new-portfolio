'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, ExternalLink } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import { certifications } from '@/data/certifications';

export function Certifications() {
  const t = useTranslations('certifications');

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <Card className="flex flex-col h-full hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <div className="flex items-start gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Award className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-accent transition-colors">
                        {cert.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {cert.issuer}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-xs">
                      {cert.date}
                    </Badge>
                    {cert.credentialId && (
                      <p className="text-xs text-muted-foreground">
                        ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                  {cert.credentialUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 group-hover:border-accent group-hover:text-accent"
                      asChild
                    >
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {t('viewCredential')}
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
