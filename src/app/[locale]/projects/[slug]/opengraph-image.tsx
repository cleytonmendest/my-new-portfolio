import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { projects } from '@/data/projects';
import { getLocalizedText } from '@/data/utils';
import { routing } from '@/i18n/routing';
import { renderShareImage, shareImageSize } from '@/lib/share-image';

export const alt = 'Case study by Cleyton Mendes';
export const size = shareImageSize;
export const contentType = 'image/png';

// Rendered at build time for each case study in each locale, like the pages. This route does not
// inherit the locale params, so it lists both.
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })));
}

/** Share image of a case study: project name, summary and stack. */
export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const t = await getTranslations({ locale, namespace: 'site.projects' });

  return renderShareImage({
    label: t('caseStudy'),
    title: project.name,
    text: getLocalizedText(project.description, locale),
    tags: project.technologies,
  });
}
