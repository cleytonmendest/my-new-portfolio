import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Reveal, SectionHeading } from '@/components/terminal';
import { ProjectCard } from '@/components/sections';
import { projects } from '@/data/projects';
import { localeAlternates } from '@/lib/metadata';

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'site.projects' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: localeAlternates(locale, '/projects'),
  };
}

/** Every project, in the same cards as the home page. */
export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('site.projects');

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
