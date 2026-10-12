import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * Adds the locale prefix to portfolio URLs: `/` and `/projects` redirect to `/en/...` or `/pt/...`
 * based on the NEXT_LOCALE cookie, then the browser language.
 */
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, files with an extension, and the legacy pages (tools and the
  // WhatsApp bot legal pages), whose URLs stay without a locale.
  matcher: ['/((?!api|_next|_vercel|tools|whatsapp-bot|.*\\..*).*)'],
};
