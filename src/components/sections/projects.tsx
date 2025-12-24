'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import { motion } from 'framer-motion';

export function Projects() {
  const t = useTranslations('projects');

  const projects = [
    {
      name: t('items.0.name'),
      description: t('items.0.description'),
      technologies: ['React', 'TypeScript', 'Sass', 'Vtex IO'],
      image: '/projects/logo-tiffany.svg',
      bgColor: '#81d8d0',
      url: 'https://www.tiffany.com.br/',
    },
    {
      name: t('items.1.name'),
      description: t('items.1.description'),
      technologies: ['React', 'TypeScript', 'Sass', 'Vtex IO'],
      image: '/projects/logo-vitaminese.svg',
      bgColor: '#f3e7ff',
      url: 'https://www.vitaminese.com.br/',
    },
    {
      name: t('items.2.name'),
      description: t('items.2.description'),
      technologies: ['Preact', 'Typescript', 'Tailwind CSS', 'Vtex IO'],
      image: '/projects/logo-ultrafeu.png',
      bgColor: '#FFF',
      url: 'https://www.ultrafeu.com.br/',
    },
  ];

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
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/50 group">
                  {/* Project Image */}
                  <div
                    className="relative w-full h-48 flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: project.bgColor }}
                  >
                    {project.image ? (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={project.image}
                          alt={project.name}
                          width={300}
                          height={192}
                          className="object-contain p-8"
                        />
                      </motion.div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-primary/5">
                        <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-accent transition-colors">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="group-hover:bg-accent/10">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-2 group-hover:border-accent group-hover:text-accent" asChild>
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          {t('viewProject')}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
