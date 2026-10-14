import { terminalFontVariables } from '@/lib/fonts';
import { SITE_URL } from '@/lib/metadata';
import './globals.css';

/**
 * Global 404 for paths outside the localized portfolio (for example a wrong /tools URL).
 * It has no locale, so the message is bilingual and the link goes to `/`, which redirects
 * to the visitor's language.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        className={`${terminalFontVariables} theme-terminal dark flex min-h-screen flex-col items-center justify-center bg-console-black px-4 text-center font-roboto text-console-white antialiased`}
      >
        <p className="font-roboto-mono text-caption text-cursor-green">[404]</p>
        <h1 className="mt-4 text-3xl font-bold tracking-[-0.02em] md:text-headline">Page not found</h1>
        <p className="mt-2 text-subheading text-muted-ash">Página não encontrada</p>
        <a href="/" className="mt-8 text-base text-cursor-green">
          <span className="link-underline">{new URL(SITE_URL).host}</span>
        </a>
      </body>
    </html>
  );
}
