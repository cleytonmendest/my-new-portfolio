import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/theme-provider';
import { StructuredData } from '@/components/structured-data';
import { Toaster } from 'sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cleyton-mendes.com'),
  title: {
    default: 'Cleyton Mendes - Software Engineer | E-commerce Specialist',
    template: '%s | Cleyton Mendes',
  },
  description:
    'Software Engineer with 4+ years of experience specializing in e-commerce solutions. Expert in React, TypeScript, Node.js, VTEX, Shopify, and modern web technologies. Available for remote opportunities.',
  keywords: [
    'Software Engineer',
    'Front-end Engineer',
    'React Developer',
    'TypeScript Developer',
    'E-commerce Developer',
    'VTEX Developer',
    'Shopify Developer',
    'JavaScript',
    'Node.js',
    'Web Development',
    'Remote Developer',
    'Cleyton Mendes',
    'Portfolio',
  ],
  authors: [{ name: 'Cleyton Mendes', url: 'https://cleyton-mendes.com' }],
  creator: 'Cleyton Mendes',
  publisher: 'Cleyton Mendes',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
    url: 'https://cleyton-mendes.com',
    title: 'Cleyton Mendes - Software Engineer | E-commerce Specialist',
    description:
      'Software Engineer with 4+ years of experience specializing in e-commerce solutions. Expert in React, TypeScript, Node.js, VTEX, Shopify, and modern web technologies.',
    siteName: 'Cleyton Mendes Portfolio',
    images: [
      {
        url: '/cleyton-mendes.png',
        width: 800,
        height: 800,
        alt: 'Cleyton Mendes - Software Engineer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cleytonmendest',
    creator: '@cleytonmendest',
    title: 'Cleyton Mendes - Software Engineer | E-commerce Specialist',
    description:
      'Software Engineer with 4+ years of experience specializing in e-commerce solutions. Expert in React, TypeScript, Node.js, and modern web technologies.',
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
            <Toaster position="bottom-right" />
          </NextIntlClientProvider>
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
