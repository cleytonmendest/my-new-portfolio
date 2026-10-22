import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { GhostLink, Reveal, Tag } from '@/components/terminal';
import { projects } from '@/data/projects';
import { getLocalizedText } from '@/data/utils';
import { Link } from '@/i18n/routing';
import { getProjectBody } from '@/lib/content';
import { localeAlternates } from '@/lib/metadata';
import { keepHyphenatedWords } from '@/lib/text';

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Only the slugs in src/data/projects.ts exist; anything else is a 404 (no runtime file reads).
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = findProject(slug);
  if (!project) return {};
  const cover = project.screenshots?.desktop ?? project.screenshots?.mobile;

  return {
    title: project.name,
    description: getLocalizedText(project.description, locale),
    alternates: localeAlternates(locale, `/projects/${slug}`),
    openGraph: cover ? { images: [{ url: cover, alt: project.name }] } : undefined,
  };
}

/**
 * Case study: summary, stack and link, screenshots of the live store, the MDX body, then a contact
 * CTA and a link to the next case study.
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = findProject(slug);
  if (!project) notFound();

  const t = await getTranslations('site.projects');
  const format = await getFormatter();
  const body = await getProjectBody(slug, locale);
  const { screenshots } = project;
  // The case studies form a loop: the last one points back to the first.
  const nextProject = projects.length > 1 ? projects[(projects.indexOf(project) + 1) % projects.length] : null;

  return (
    <main className="flex-1 px-4 pb-20 pt-12 md:px-6 md:pt-16">
      <article className="mx-auto max-w-[1200px]">
        <GhostLink href="/projects" className="text-body-sm">
          {t('backToProjects')}
        </GhostLink>

        <header className="mt-8 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-[-0.02em] md:text-headline">{project.name}</h1>
          <p className="mt-4 text-subheading text-muted-ash">
            {keepHyphenatedWords(getLocalizedText(project.description, locale))}
          </p>
          <ul aria-label={t('stackLabel')} className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li key={technology}>
                <Tag>{technology}</Tag>
              </li>
            ))}
          </ul>
          <GhostLink href={project.url} external arrow="up-right" className="mt-6 text-base">
            {t('visit')}
          </GhostLink>
        </header>

        {screenshots && (
          <Reveal className="mt-12">
            <figure>
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                {screenshots.desktop && (
                  <div className="flex-1 border border-border-smoke bg-panel-charcoal">
                    <p className="truncate border-b border-border-smoke px-4 py-2.5 font-roboto-mono text-caption text-muted-ash">
                      {project.url}
                    </p>
                    <Image
                      src={screenshots.desktop}
                      alt={t('desktopAlt', { name: project.name })}
                      width={1440}
                      height={900}
                      sizes="(min-width: 1248px) 880px, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                )}
                {screenshots.mobile && (
                  <div className="mx-auto w-full max-w-[280px] shrink-0 overflow-hidden rounded-card border border-border-smoke bg-panel-charcoal md:mx-0">
                    <Image
                      src={screenshots.mobile}
                      alt={t('mobileAlt', { name: project.name })}
                      width={780}
                      height={1688}
                      sizes="280px"
                      className="h-auto w-full"
                    />
                  </div>
                )}
              </div>
              {/* capturedAt is a plain date (UTC midnight); format it in UTC so it does not shift a day. */}
              <figcaption className="mt-3 font-roboto-mono text-caption text-muted-ash">
                {t('capturedOn', { date: format.dateTime(new Date(screenshots.capturedAt), { dateStyle: 'long', timeZone: 'UTC' }) })}
              </figcaption>
            </figure>
          </Reveal>
        )}

        {body && <div className="mt-12 max-w-3xl">{body}</div>}

        <Reveal className="mt-16 grid gap-10 border-t border-border-smoke pt-10 md:grid-cols-[1fr_auto] md:items-end">
          <section aria-labelledby="case-cta-title">
            <h2 id="case-cta-title" className="text-heading-sm font-semibold">
              {t('ctaTitle')}
            </h2>
            <p className="mt-2 text-body text-muted-ash">{t('ctaDescription')}</p>
            <Button
              asChild
              className="mt-6 h-12 rounded-tag px-6 text-base font-semibold hover:-translate-y-0.5 active:translate-y-0"
            >
              <Link href={{ pathname: '/', hash: 'contact' }}>{t('cta')}</Link>
            </Button>
          </section>
          {nextProject && (
            <div>
              <p className="font-roboto-mono text-caption text-muted-ash">{t('nextProject')}</p>
              <GhostLink href={`/projects/${nextProject.slug}`} arrow="right" className="mt-1 text-subheading">
                {nextProject.name}
              </GhostLink>
            </div>
          )}
        </Reveal>
      </article>
    </main>
  );
}
