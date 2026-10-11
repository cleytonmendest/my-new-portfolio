import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/layout/section';
import { ScrollFrame } from '@/components/motion/scroll-frame';
import { ProjectIndex } from '@/components/sections/project-index';
import { projects } from '@/data/projects';
import { getLocalizedText, slugify } from '@/data/utils';

export function Projects() {
  const t = useTranslations('projects');
  const locale = useLocale();

  const items = projects.map((project) => ({ ...project, id: `project-${slugify(project.name)}` }));

  return (
    <Section
      id="projects"
      title={t('title')}
      rail={<ProjectIndex items={items.map(({ id, name }) => ({ id, name }))} />}
    >
      <div className="space-y-24">
        {items.map((project) => (
          <article
            key={project.id}
            id={project.id}
            aria-labelledby={`${project.id}-name`}
            className="grid scroll-mt-24 gap-8 xl:grid-cols-5"
          >
            <div className="space-y-6 xl:col-span-2">
              <h3 id={`${project.id}-name`} className="text-3xl font-bold tracking-tight">
                {project.name}
              </h3>
              <p className="font-serif text-lg leading-relaxed text-muted-foreground">
                {getLocalizedText(project.description, locale)}
              </p>

              <dl className="text-sm">
                <div className="grid grid-cols-3 gap-4 border-t border-border py-3">
                  <dt className="text-muted-foreground">{t('platform')}</dt>
                  <dd className="col-span-2">{project.platform}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4 border-t border-border py-3">
                  <dt className="text-muted-foreground">{t('role')}</dt>
                  <dd className="col-span-2">{getLocalizedText(project.role, locale)}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4 border-y border-border py-3">
                  <dt className="text-muted-foreground">{t('stack')}</dt>
                  <dd className="col-span-2">{project.stack.join(', ')}</dd>
                </div>
              </dl>

              {project.status === 'live' ? (
                <Button asChild variant="outline">
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    {t('visit')}
                    <ExternalLink />
                  </a>
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground">{t('maintenance')}</p>
              )}
            </div>

            <div className="xl:col-span-3">
              {project.screenshot ? (
                <ScrollFrame
                  src={project.screenshot.src}
                  width={project.screenshot.width}
                  height={project.screenshot.height}
                  alt={t('screenshotAlt', { name: project.name })}
                />
              ) : (
                <div className="flex h-96 items-center justify-center rounded-media border border-input bg-paper md:h-112">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={240}
                    height={120}
                    className="h-auto w-48 object-contain"
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
