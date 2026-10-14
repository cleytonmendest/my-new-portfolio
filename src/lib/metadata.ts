import type { Metadata } from 'next';
import { locales } from '@/i18n/config';

/**
 * Public URL of the site, used by canonical links, hreflang, the sitemap, robots.txt and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL for a custom domain. Without it, Vercel builds use the production URL
 * the platform exposes (VERCEL_PROJECT_PRODUCTION_URL), and local builds use localhost.
 */
function resolveSiteUrl() {
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const url = process.env.NEXT_PUBLIC_SITE_URL || (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000');
  return url.replace(/\/$/, '');
}

export const SITE_URL = resolveSiteUrl();

/** Metadata shared by every page, portfolio and legacy alike. */
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: 'Cleyton Mendes', url: SITE_URL }],
  creator: 'Cleyton Mendes',
  publisher: 'Cleyton Mendes',
  keywords: [
    'Software Engineer',
    'Front-end Engineer',
    'React Developer',
    'TypeScript Developer',
    'Ruby on Rails Developer',
    'E-commerce Developer',
    'VTEX Developer',
    'Shopify Developer',
    'Next.js',
    'Node.js',
    'Remote Developer',
    'Cleyton Mendes',
    'Portfolio',
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

/**
 * Canonical URL and hreflang alternates for a localized path.
 * `path` is the route without the locale, e.g. '' for home or '/projects/ultrafeu'.
 */
export function localeAlternates(locale: string, path: string): Metadata['alternates'] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((item) => [item, `/${item}${path}`])),
      'x-default': `/en${path}`,
    },
  };
}
