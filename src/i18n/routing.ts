import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'pt'],
  defaultLocale: 'en',
  // Every page lives under /en or /pt so each language has its own indexable URL.
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  pt: 'Português',
};

// Navigation helpers that add and respect the locale prefix. Use these instead of
// next/link and next/navigation for internal links to localized pages.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
