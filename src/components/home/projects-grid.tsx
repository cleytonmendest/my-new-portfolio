import { useTranslations } from 'next-intl';
import { GhostLink, Reveal, SectionHeading } from '@/components/terminal';
import { ProjectCard } from '@/components/sections';
import { projects } from '@/data/projects';

/** Featured storefronts; links to the projects page only when it has more to show. */
export function ProjectsGrid() {
  const t = useTranslations('site.projects');
  const featured = projects.filter((project) => project.featured);

  return (
    <section id="projects" className="scroll-mt-10 px-4 md:px-6">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading title={t('title')} description={t('description')} />

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <li key={project.name}>
              <Reveal delay={index * 0.1} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>

        {projects.length > featured.length && (
          <div className="mt-8 text-center">
            <GhostLink href="/projects" className="text-base">
              {t('viewAll')}
            </GhostLink>
          </div>
        )}
      </div>
    </section>
  );
}
