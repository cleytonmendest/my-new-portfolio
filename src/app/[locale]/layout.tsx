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
      images: [{ url: '/cleyton-mendes.png', width: 800, height: 800, alt: 'Cleyton Mendes', type: 'image/png' }],
    },
    twitter: {
      card: 'summary_large_image',
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
            <div id="top" className="flex min-h-screen flex-col">
              <SiteHeader />
              {children}
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
