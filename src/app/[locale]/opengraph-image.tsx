import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { renderShareImage, shareImageSize } from '@/lib/share-image';

export const alt = 'Cleyton Mendes, software engineer';
export const size = shareImageSize;
export const contentType = 'image/png';

// Rendered at build time for each locale, like the pages.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Share image of the home, also used by the pages without their own (experience, projects, education). */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'site.hero' });

  return renderShareImage({ label: t('role'), title: t('headlineSummary') });
}
