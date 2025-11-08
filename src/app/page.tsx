import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';

export default function HomePage() {
  const t = useTranslations('nav');

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 right-0 p-4 flex items-center gap-4">
        <LanguageSwitcher />
        <ThemeToggle />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4">
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
