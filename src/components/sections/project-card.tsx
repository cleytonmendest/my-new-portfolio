import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { GhostLink, Tag } from '@/components/terminal';
import type { Project } from '@/data/types';
import { getLocalizedText } from '@/data/utils';
import { Link } from '@/i18n/routing';

interface ProjectCardProps {
  project: Project;
  /** `h3` inside the home section, `h2` on the projects page. */
  headingLevel?: 'h2' | 'h3';
}

/**
 * Storefront card with a monochrome logo. The title link stretches over the whole card and opens
 * the case study; "Visit site" sits above that overlay and goes to the live store.
 */
export function ProjectCard({ project, headingLevel: Heading = 'h3' }: ProjectCardProps) {
  const t = useTranslations('site.projects');
  const locale = useLocale();

  return (
    <Card className="group/card relative h-full gap-0 overflow-hidden rounded-card py-0 shadow-none transition-colors duration-300 hover:border-muted-ash has-[a:focus-visible]:border-cursor-green">
      <div className="flex h-40 items-center justify-center border-b border-border-smoke bg-panel-charcoal px-8">
        <Image
          src={project.image}
          alt=""
          width={200}
          height={40}
          className="h-8 w-auto max-w-full object-contain brightness-0 invert-[.55] transition-[filter,scale] duration-500 group-hover/card:scale-105 group-hover/card:invert-[.9]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Heading className="text-subheading font-semibold transition-colors group-hover/card:text-cursor-green">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.name}
          </Link>
        </Heading>
        <p className="mt-2 text-body-sm text-muted-ash">{getLocalizedText(project.description, locale)}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <li key={technology}>
              <Tag>{technology}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <GhostLink href={project.url} external arrow="up-right" className="relative z-10 text-body-sm">
            {t('visit')}
          </GhostLink>
        </div>
      </div>
    </Card>
  );
}
