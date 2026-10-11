'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';
import { FadeIn } from '@/components/motion/fade-in';
import { projects } from '@/data/projects';
import { getLocalizedText } from '@/data/utils';

export function Projects() {
  const t = useTranslations('projects');
  const locale = useLocale();

  return (
    <section className="py-20 px-4 bg-muted/30" id="projects">
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
          {projects.map((project, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <Card className="flex flex-col h-full overflow-hidden">
                {/* Project Image */}
                <div className="relative w-full h-48 flex items-center justify-center overflow-hidden bg-paper">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={300}
                      height={192}
                      className="object-contain p-8"
                    />
                  ) : (
                    <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {getLocalizedText(project.description, locale)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, idx) => (
                      <Badge key={idx} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.status === 'live' ? (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-2" asChild>
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          {t('viewProject')}
                        </a>
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">{t('maintenance')}</p>
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
