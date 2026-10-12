import { useTranslations } from 'next-intl';
import { Reveal, SectionHeading } from '@/components/terminal';
import { ProjectCard } from '@/components/sections';
import { projects } from '@/data/projects';

/** Every storefront, in the same cards as the home page. */
export default function ProjectsPage() {
  const t = useTranslations('site.projects');

  return (
    <main className="flex-1 px-4 pb-20 pt-12 md:px-6 md:pt-16">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading as="h1" title={t('title')} description={t('description')} />

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.name}>
              <Reveal delay={(index % 3) * 0.1} className="h-full">
                <ProjectCard project={project} headingLevel="h2" />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
