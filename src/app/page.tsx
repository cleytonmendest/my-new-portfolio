import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Hero } from '@/components/sections/hero';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 right-0 p-4 flex items-center gap-4 z-50">
        <LanguageSwitcher />
        <ThemeToggle />
      </header>

      <main>
        <Hero />
      </main>
    </div>
  );
}
