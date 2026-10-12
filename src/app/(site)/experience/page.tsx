import { useTranslations } from 'next-intl';
import { Reveal, SectionHeading } from '@/components/terminal';
import { ExperienceDetails } from '@/components/sections';
import { experiences } from '@/data/experience';
import { getStartYear } from '@/data/utils';

/** Every role at once, newest first, as a dated log. */
export default function ExperiencePage() {
  const t = useTranslations('site.experience');

  return (
    <main className="flex-1 px-4 pb-20 pt-12 md:px-6 md:pt-16">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading as="h1" title={t('title')} description={t('pageDescription')} />

        <ol className="mx-auto max-w-3xl space-y-6">
          {experiences.map((item) => (
            <li key={item.company} className="grid gap-3 md:grid-cols-[96px_1fr] md:gap-6">
              <span className="font-roboto-mono text-caption text-cursor-green md:pt-8">
                [{getStartYear(item.period)}]
              </span>
              <Reveal className="rounded-card border border-border-smoke bg-panel-charcoal p-6 md:p-8">
                <ExperienceDetails item={item} headingLevel="h2" />
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
