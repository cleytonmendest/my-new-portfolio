'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Link, usePathname } from '@/i18n/routing';

// Section ids on the home page, in reading order.
const sectionIds = ['projects', 'experience', 'skills', 'certifications', 'about', 'contact'] as const;
type SectionId = (typeof sectionIds)[number];

export function Navigation() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  const navItems = sectionIds.map((id) => ({ id, label: t(id), href: `/#${id}` }));

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlights the section that crosses the middle of the viewport (home page only).
  useEffect(() => {
    if (pathname !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          // The hero is not a menu item: nothing is highlighted while it is in view.
          setActiveSection(entry.target.id === 'home' ? null : (entry.target.id as SectionId));
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    for (const id of ['home', ...sectionIds]) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [pathname]);

  const linkClass = (id: SectionId) =>
    `text-sm font-medium transition-colors hover:text-foreground ${
      pathname === '/' && activeSection === id ? 'text-foreground' : 'text-muted-foreground'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        isScrolled || isMenuOpen ? 'border-b border-border bg-background/90 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-control focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {tCommon('skipToContent')}
      </a>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          aria-label={t('home')}
          className="text-lg font-extrabold tracking-tight font-stretch-expanded"
        >
          CM
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.id} href={item.href} className={linkClass(item.id)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? t('close') : t('menu')}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border md:hidden">
          <nav aria-label="Main" className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-control px-3 py-2 ${linkClass(item.id)}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-border pt-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
