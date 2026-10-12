'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, SquareTerminal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GhostLink } from './ghost-link';
import { LocaleToggle } from './locale-toggle';
import { EASE_OUT } from './motion';
import { getCvFile } from './constants';

// Absolute anchors, so the links also work from the standalone pages.
const NAV_ITEMS = [
  { key: 'experience', href: '/#experience' },
  { key: 'projects', href: '/#projects' },
  { key: 'stack', href: '/#skills' },
  { key: 'education', href: '/#certifications' },
] as const;

/** Transparent top bar: wordmark, section links, language switch and the contact CTA. */
export function SiteHeader() {
  const t = useTranslations('site.header');
  const cv = getCvFile(useLocale());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsMenuOpen(false);

  // While the mobile menu is open: focus its first link, close on Escape or on a click outside.
  useEffect(() => {
    if (!isMenuOpen) return;
    menuRef.current?.querySelector('a')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsMenuOpen(false);
      toggleRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !toggleRef.current?.contains(target)) setIsMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="relative z-40 animate-fade-in motion-reduce:animate-none">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-3 px-4 md:gap-6 md:px-6">
        <Link href="/" className="flex items-center gap-2 whitespace-nowrap text-body-sm font-bold">
          <SquareTerminal className="size-5 text-cursor-green" aria-hidden />
          cleyton mendes
        </Link>

        <nav aria-label={t('navLabel')} className="hidden items-center gap-10 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="bracket-hover text-body-sm text-console-white transition-colors hover:text-cursor-green"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden items-center gap-6 lg:flex">
            <LocaleToggle />
            <GhostLink href={cv.href} download={cv.filename} className="text-sm">
              {t('downloadCV')}
            </GhostLink>
          </div>

          <Button
            asChild
            className="h-9 rounded-tag px-4 text-sm font-semibold hover:-translate-y-0.5 active:translate-y-0"
          >
            <Link href="/#contact">{t('cta')}</Link>
          </Button>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="site-menu"
            aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
            className="flex size-9 items-center justify-center rounded-tag border border-border-smoke text-console-white transition-colors hover:border-muted-ash lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isMenuOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                {isMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            id="site-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden border-y border-border-smoke bg-panel-charcoal lg:hidden"
          >
            <nav aria-label={t('navLabel')} className="mx-auto flex max-w-[1200px] flex-col px-4 md:px-6">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 + index * 0.05 }}
                  className="border-b border-border-smoke"
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="group flex items-center gap-2 py-3 text-body text-console-white"
                  >
                    <span
                      aria-hidden
                      className="font-roboto-mono text-caption text-muted-ash transition-colors group-hover:text-cursor-green"
                    >
                      &gt;
                    </span>
                    {t(`nav.${item.key}`)}
                  </Link>
                </motion.div>
              ))}
              <div className="flex items-center justify-between py-4">
                <LocaleToggle />
                <GhostLink href={cv.href} download={cv.filename} arrow="down" className="text-body-sm">
                  {t('downloadCV')}
                </GhostLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
