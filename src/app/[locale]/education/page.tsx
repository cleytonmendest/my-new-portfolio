import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Reveal, SectionHeading } from '@/components/terminal';
import { EducationList } from '@/components/sections';
import { localeAlternates } from '@/lib/metadata';

interface EducationPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: EducationPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'site.education' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: localeAlternates(locale, '/education'),
  };
}

/** Degree and every certification, with credential IDs. */
export default async function EducationPage({ params }: EducationPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('site.education');

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
