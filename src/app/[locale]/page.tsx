import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('nav');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <main className="flex flex-col items-center gap-8 px-4">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">
          {t('home')}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Portfolio - Work in Progress
        </p>
      </main>
    </div>
  );
}
