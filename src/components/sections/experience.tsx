import { useLocale, useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { experiences } from '@/data/experience';
import { getLocalizedArray, getLocalizedText } from '@/data/utils';

export function Experience() {
  const t = useTranslations('experience');
  const locale = useLocale();

  return (
    <Section id="experience" title={t('title')}>
      <ol>
        {experiences.map((item) => (
          <li
            key={`${item.company}-${item.position}`}
            className="grid gap-4 border-t border-border py-10 first:border-t-0 first:pt-0 sm:grid-cols-4"
          >
            <p className="text-sm text-muted-foreground sm:col-span-1">
              {getLocalizedText(item.period, locale)}
            </p>

            <div className="space-y-4 sm:col-span-3">
              <div>
                <h3 className="text-xl font-semibold">{item.position}</h3>
                <p className="text-muted-foreground">
                  {item.companyUrl ? (
                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:text-foreground hover:underline"
                    >
                      {item.company}
                    </a>
                  ) : (
                    item.company
                  )}
                </p>
              </div>

              <p className="max-w-prose font-serif text-lg leading-relaxed">
                {getLocalizedText(item.description, locale)}
              </p>

              <ul className="max-w-prose list-disc space-y-1 pl-5 font-serif leading-relaxed text-muted-foreground">
                {getLocalizedArray(item.achievements, locale).map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
