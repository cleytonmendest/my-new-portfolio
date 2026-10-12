import { useLocale, useTranslations } from 'next-intl';
import { GhostLink } from '@/components/terminal';
import { certifications } from '@/data/certifications';
import { education } from '@/data/education';
import { getLocalizedText } from '@/data/utils';

const rowClassName = 'grid gap-1 py-5 md:grid-cols-[160px_1fr_auto] md:items-baseline md:gap-6';
const dateClassName = 'font-roboto-mono text-caption text-muted-ash';

interface EducationListProps {
  /** Show only the first N certifications (newest first in the data). */
  certificationLimit?: number;
  showCredentialIds?: boolean;
}

/** Education and certifications as log entries: [date] title, source, action. */
export function EducationList({ certificationLimit, showCredentialIds = false }: EducationListProps) {
  const t = useTranslations('site.education');
  const locale = useLocale();
  const shownCertifications = certificationLimit ? certifications.slice(0, certificationLimit) : certifications;

  return (
    <ol className="divide-y divide-border-smoke border-y border-border-smoke">
      {education.map((item) => (
        <li key={item.institution} className={rowClassName}>
          <span className={dateClassName}>[{getLocalizedText(item.period, locale)}]</span>
          <div>
            <p className="text-body font-semibold">{getLocalizedText(item.degree, locale)}</p>
            <p className="text-body-sm text-muted-ash">{item.institution}</p>
          </div>
          <span className="font-roboto-mono text-caption text-cursor-green">
            [{item.status === 'completed' ? t('completed') : t('inProgress')}]
          </span>
        </li>
      ))}

      {shownCertifications.map((item) => (
        <li key={item.credentialId ?? item.name.en} className={rowClassName}>
          <span className={dateClassName}>[{item.date}]</span>
          <div>
            <p className="text-body font-semibold">{getLocalizedText(item.name, locale)}</p>
            <p className="text-body-sm text-muted-ash">{item.issuer}</p>
            {showCredentialIds && item.credentialId && (
              <p className="mt-1 break-all font-roboto-mono text-caption text-muted-ash">
                {t('credentialId')}: {item.credentialId}
              </p>
            )}
          </div>
          {item.credentialUrl && (
            <GhostLink href={item.credentialUrl} external arrow="up-right" className="text-body-sm">
              {t('verify')}
            </GhostLink>
          )}
        </li>
      ))}
    </ol>
  );
}
