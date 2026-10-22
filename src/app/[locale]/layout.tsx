import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { GoogleAnalytics } from '@next/third-parties/google';
import { MotionProvider, SiteFooter, SiteHeader, WhatsAppButton } from '@/components/terminal';
import { StructuredData } from '@/components/structured-data';
import { routing } from '@/i18n/routing';
import { terminalFontVariables } from '@/lib/fonts';
import { baseMetadata, localeAlternates } from '@/lib/metadata';
import '../globals.css';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Only /en and /pt exist. Without this, a missing file like /favicon-16x16.png is rendered as a
// locale page and fails with a 500 (the request config reads the cookie on a static route).
export const dynamicParams = false;

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'site.meta' });
  const title = t('title');
  const description = t('description');

  return {
    ...baseMetadata,
    title: { default: title, template: '%s | Cleyton Mendes' },
    description,
    alternates: localeAlternates(locale, ''),
    openGraph: {
      type: 'profile',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      alternateLocale: locale === 'pt' ? ['en_US'] : ['pt_BR'],
      url: `/${locale}`,
      title,
      description,
      siteName: 'Cleyton Mendes',
      images: [{ url: '/cleyton-mendes.png', width: 827, height: 1016, alt: 'Cleyton Mendes', type: 'image/png' }],
    },
    twitter: {
      // A portrait photo: the square summary card keeps the face, the 2:1 large card would crop it.
      card: 'summary',
      site: '@cleytonmendest',
      creator: '@cleytonmendest',
      title,
      description,
      images: ['/cleyton-mendes.png'],
    },
  };
}

/**
 * Root layout of the portfolio (home, experience, projects, education), one static build per
 * locale under /en and /pt. Terminal design: always dark, scoped by `theme-terminal`.
 */
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('site.header');

  return (
    <html lang={locale}>
      <head>
        <StructuredData locale={locale} />
      </head>
      <body
        className={`${terminalFontVariables} theme-terminal dark bg-console-black font-roboto text-console-white antialiased`}
      >
        <NextIntlClientProvider>
          <MotionProvider>
            {/* First stop for keyboard users: hidden above the viewport until it gets focus. */}
            <a
              href="#content"
              className="fixed left-4 top-3 z-50 -translate-y-[calc(100%+1rem)] rounded-tag border border-border-smoke bg-panel-charcoal px-4 py-2 text-body-sm text-console-white transition-transform focus:translate-y-0 motion-reduce:transition-none"
            >
              {t('skipToContent')}
            </a>
            <div id="top" className="flex min-h-screen flex-col">
              <SiteHeader />
              <div id="content" className="flex flex-1 flex-col">
                {children}
              </div>
              <SiteFooter />
            </div>
            <WhatsAppButton />
          </MotionProvider>
        </NextIntlClientProvider>
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}
