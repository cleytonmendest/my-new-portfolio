import { cookies } from 'next/headers';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Portfolio pages get the locale from the [locale] URL segment. Legacy pages (tools and the
  // WhatsApp bot legal pages) have no segment, so they fall back to the NEXT_LOCALE cookie.
  let locale = await requestLocale;
  if (!hasLocale(routing.locales, locale)) {
    const cookieLocale = (await cookies()).get('NEXT_LOCALE')?.value;
    locale = hasLocale(routing.locales, cookieLocale) ? cookieLocale : routing.defaultLocale;
  }

  return {
    locale,
    // Fixed time zone so server and client format dates the same way.
    timeZone: 'America/Sao_Paulo',
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
