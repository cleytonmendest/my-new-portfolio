import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { defaultLocale, locales } from './config';

/** Portfolio URLs always carry the locale: /en/..., /pt/... */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

/** Locale-aware Link and router: hrefs are written without the locale and get it added. */
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
