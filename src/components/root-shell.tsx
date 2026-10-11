import type { ReactNode } from 'react';
import { Archivo, Source_Serif_4 } from 'next/font/google';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import '@/app/globals.css';

// Archivo carries headings and interface; its width axis (wdth) is part of the
// identity. Source Serif 4 is for long text. The latin subset covers Portuguese, so latin-ext
// is not downloaded.
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
  display: 'swap',
});

interface RootShellProps {
  /** Value of the html lang attribute. */
  lang: string;
  /** next-intl locale used by client components. */
  locale: string;
  messages: AbstractIntlMessages;
  children: ReactNode;
}

/**
 * The html and body shared by both root layouts: the localized site ([locale]) and the
 * Portuguese-only utility pages ((utility)).
 */
export function RootShell({ lang, locale, messages, children }: RootShellProps) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${archivo.variable} ${sourceSerif.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
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
