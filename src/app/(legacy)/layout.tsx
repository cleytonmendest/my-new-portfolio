import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import { baseMetadata } from '@/lib/metadata';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    default: 'Cleyton Mendes',
    template: '%s | Cleyton Mendes',
  },
};

/**
 * Root layout for the pages outside the localized portfolio: personal tools and the WhatsApp bot
 * legal pages. Their URLs have no locale prefix (the bot's policy URLs are registered externally);
 * the language comes from the NEXT_LOCALE cookie. They keep the previous light/dark theme.
 */
export default async function LegacyLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider>
            {children}
            <Toaster position="bottom-right" />
          </NextIntlClientProvider>
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}
