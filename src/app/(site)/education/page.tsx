import { useTranslations } from 'next-intl';
import { Reveal, SectionHeading } from '@/components/terminal';
import { EducationList } from '@/components/sections';

/** Degree and every certification, with credential IDs. */
export default function EducationPage() {
  const t = useTranslations('site.education');

  return (
    <main className="flex-1 px-4 pb-20 pt-12 md:px-6 md:pt-16">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading as="h1" title={t('title')} description={t('description')} />

        <Reveal className="mx-auto max-w-4xl">
          <EducationList showCredentialIds />
        </Reveal>
      </div>
    </main>
  );
}
