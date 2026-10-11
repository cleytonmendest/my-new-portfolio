import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { RootShell } from '@/components/root-shell';
import { StructuredData } from '@/components/structured-data';
import { routing, type Locale } from '@/i18n/routing';
import { siteUrl } from '@/lib/site';

const openGraphLocale: Record<Locale, string> = { en: 'en_US', pt: 'pt_BR' };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: 'metadata' });
  const otherLocales = routing.locales.filter((item) => item !== locale);

  return {
    metadataBase: new URL(siteUrl),
    title: { default: t('title'), template: '%s | Cleyton Mendes' },
    description: t('description'),
    authors: [{ name: 'Cleyton Mendes', url: siteUrl }],
    creator: 'Cleyton Mendes',
    publisher: 'Cleyton Mendes',
    formatDetection: { email: false, address: false, telephone: false },
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/en', pt: '/pt', 'x-default': '/en' },
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale[locale],
      alternateLocale: otherLocales.map((item) => openGraphLocale[item]),
      url: `/${locale}`,
      title: t('title'),
      description: t('description'),
      siteName: 'Cleyton Mendes Portfolio',
      images: [
        {
          url: '/cleyton-mendes.png',
          width: 827,
          height: 1016,
          alt: 'Cleyton Mendes - Software Engineer',
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary',
      site: '@cleytonmendest',
      creator: '@cleytonmendest',
      title: t('title'),
      description: t('description'),
      images: ['/cleyton-mendes.png'],
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
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Opts the whole tree into static rendering for this locale.
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <RootShell lang={locale} locale={locale} messages={messages}>
      <StructuredData locale={locale} />
      {children}
    </RootShell>
  );
}
