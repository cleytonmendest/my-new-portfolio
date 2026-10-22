import { useLocale, useTranslations } from 'next-intl';
import { GhostLink } from '@/components/terminal';
import type { Experience } from '@/data/types';
import { getLocalizedArray, getLocalizedText } from '@/data/utils';
import { keepHyphenatedWords } from '@/lib/text';

interface ExperienceDetailsProps {
  item: Experience;
  /** `h3` inside the home section, `h2` on the experience page. */
  headingLevel?: 'h2' | 'h3';
}

/**
 * Role, company, period, summary and highlights of one job.
 * Inside a `group/panel` element, the highlights print one line at a time when the panel turns active.
 */
export function ExperienceDetails({ item, headingLevel: Heading = 'h3' }: ExperienceDetailsProps) {
  const t = useTranslations('site.experience');
  const locale = useLocale();

  return (
    <>
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
        <Heading className="text-heading-sm font-semibold">
          {keepHyphenatedWords(getLocalizedText(item.position, locale))}
        </Heading>
        <p className="font-roboto-mono text-caption text-muted-ash">{getLocalizedText(item.period, locale)}</p>
      </div>
      {item.companyUrl ? (
        <GhostLink href={item.companyUrl} external arrow="up-right" className="mt-1 text-body-sm">
          {item.company}
        </GhostLink>
      ) : (
        <p className="mt-1 text-body-sm text-muted-ash">{item.company}</p>
      )}

      <p className="mt-6 text-body text-highlight-mist">
        {keepHyphenatedWords(getLocalizedText(item.description, locale))}
      </p>

      <p className="mt-6 font-roboto-mono text-caption text-muted-ash">{t('highlights')}</p>
      <ul className="mt-3 space-y-2">
        {getLocalizedArray(item.achievements, locale).map((achievement, index) => (
          <li
            key={achievement}
            style={{ transitionDelay: `${150 + index * 80}ms` }}
            className="flex gap-3 text-body-sm text-highlight-mist transition-[opacity,translate] duration-300 group-data-[state=inactive]/panel:-translate-x-2 group-data-[state=inactive]/panel:opacity-0 motion-reduce:transition-none"
          >
            <span aria-hidden className="font-roboto-mono text-muted-ash">
              &gt;
            </span>
            <span>{keepHyphenatedWords(achievement)}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
