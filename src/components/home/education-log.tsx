import { useTranslations } from 'next-intl';
import { GhostLink, Reveal, SectionHeading } from '@/components/terminal';
import { EducationList } from '@/components/sections';
import { certifications } from '@/data/certifications';

const HOME_CERTIFICATION_LIMIT = 3;

/** Degree and latest certifications; links to the education page only when it has more to show. */
export function EducationLog() {
  const t = useTranslations('site.education');

  return (
    <section id="certifications" className="scroll-mt-10 px-4 md:px-6">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading title={t('title')} description={t('description')} />

        <Reveal className="mx-auto max-w-4xl">
          <EducationList certificationLimit={HOME_CERTIFICATION_LIMIT} />
        </Reveal>

        {certifications.length > HOME_CERTIFICATION_LIMIT && (
          <div className="mt-8 text-center">
            <GhostLink href="/education" className="text-base">
              {t('viewAll')}
            </GhostLink>
          </div>
        )}
      </div>
    </section>
  );
}
