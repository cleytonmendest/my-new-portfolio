import { useTranslations } from 'next-intl';
import { Reveal, SectionHeading, Tag } from '@/components/terminal';
import { skillsData } from '@/data/skills';

/** Small green square that marks tools used in client work; explained by the legend below the list. */
function ClientWorkMarker() {
  return <span aria-hidden className="inline-block size-1.5 shrink-0 bg-cursor-green" />;
}

/** Tech stack as a flat console panel, one row per category, with a legend for client-work tools. */
export function StackPanel() {
  const t = useTranslations('site.stack');

  return (
    <section id="skills" className="scroll-mt-10 px-4 md:px-6">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading title={t('title')} description={t('description')} />

        <Reveal className="mx-auto max-w-4xl border border-border-smoke bg-panel-charcoal">
          <dl className="divide-y divide-border-smoke">
            {skillsData.map(({ category, skills }) => (
              <div key={category} className="grid gap-3 px-4 py-5 md:grid-cols-[180px_1fr] md:items-center md:px-6">
                <dt className="font-roboto-mono text-caption text-muted-ash">
                  <span aria-hidden className="mr-2 text-cursor-green">
                    $
                  </span>
                  {t(`categories.${category}`)}
                </dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <li key={skill.name}>
                        <Tag>
                          {skill.core && <ClientWorkMarker />}
                          {skill.name}
                          {skill.core && <span className="sr-only"> ({t('legend')})</span>}
                        </Tag>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
          <p className="flex items-center gap-2 border-t border-border-smoke px-4 py-3 font-roboto-mono text-caption text-muted-ash md:px-6">
            <ClientWorkMarker />
            {t('legend')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
