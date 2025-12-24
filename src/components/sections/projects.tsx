'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

export function Projects() {
  const t = useTranslations('projects');

  const projects = [
    {
      name: t('items.0.name'),
      description: t('items.0.description'),
      technologies: ['React', 'TypeScript', 'Sass', 'Vtex IO'],
    },
    {
      name: t('items.1.name'),
      description: t('items.1.description'),
      technologies: ['React', 'TypeScript', 'Sass', 'Vtex IO'],
    },
    {
      name: t('items.2.name'),
      description: t('items.2.description'),
      technologies: ['Preact', 'Typescript', 'Tailwind CSS', 'Vtex IO'],
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted/30" id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{project.name}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <Badge key={idx} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <ExternalLink className="h-4 w-4" />
                    {t('viewProject')}
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="h-4 w-4" />
                    {t('viewCode')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
