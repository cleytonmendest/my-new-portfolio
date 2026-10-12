import { useTranslations } from 'next-intl';
import { GhostLink } from '@/components/terminal';

/** Localized 404 inside the portfolio layout (header and footer stay). */
export default function LocaleNotFound() {
  const t = useTranslations('site.notFound');

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center md:px-6">
      <p className="font-roboto-mono text-caption text-cursor-green">[404]</p>
      <h1 className="mt-4 text-3xl font-bold tracking-[-0.02em] md:text-headline">{t('title')}</h1>
      <p className="mt-4 max-w-md text-subheading text-muted-ash">{t('description')}</p>
      <GhostLink href="/" className="mt-8 text-base">
        {t('home')}
      </GhostLink>
    </main>
  );
}
