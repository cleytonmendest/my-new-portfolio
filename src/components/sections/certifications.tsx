import { useLocale, useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { certifications } from '@/data/certifications';
import { education } from '@/data/education';
import { getLocalizedText } from '@/data/utils';

const rowClass = 'grid gap-2 border-t border-border py-5 sm:grid-cols-4';

export function Certifications() {
  const t = useTranslations('certifications');
  const locale = useLocale();

  return (
    <Section id="certifications" title={t('title')}>
      <div className="space-y-14">
        <div>
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">{t('education')}</h3>
          <ul>
            {education.map((item) => (
              <li key={item.institution} className={rowClass}>
                <p className="text-sm text-muted-foreground sm:col-span-1">
                  {getLocalizedText(item.period, locale)}
                </p>
                <div className="sm:col-span-2">
                  <p className="text-lg font-semibold">{getLocalizedText(item.degree, locale)}</p>
                  <p className="text-muted-foreground">
                    {item.institutionUrl ? (
                      <a
                        href={item.institutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-4 hover:text-foreground hover:underline"
                      >
                        {item.institution}
                      </a>
                    ) : (
                      item.institution
                    )}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground sm:col-span-1 sm:text-right">
                  {t(`status.${item.status}`)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {certifications.length > 0 && (
          <div>
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">{t('certifications')}</h3>
            <ul>
              {certifications.map((item) => (
                <li key={item.name} className={rowClass}>
                  <p className="text-sm text-muted-foreground sm:col-span-1">{item.date}</p>
                  <div className="sm:col-span-2">
                    <p className="font-serif text-lg leading-snug">{item.name}</p>
                    <p className="text-muted-foreground">{item.issuer}</p>
                  </div>
                  <div className="sm:col-span-1 sm:text-right">
                    {item.credentialUrl && (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-accent-ink underline-offset-4 hover:underline"
                      >
                        {t('viewCredential')}
                        <ExternalLink className="size-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}
