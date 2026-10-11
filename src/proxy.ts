import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Detects the visitor's language and redirects `/` and unprefixed paths to /en or /pt.
// /tools, /whatsapp-bot and /design-system are Portuguese-only utility pages whose URLs
// must not change, so they are excluded along with API routes and static files.
export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|tools|whatsapp-bot|design-system|.*\\..*).*)'],
};
