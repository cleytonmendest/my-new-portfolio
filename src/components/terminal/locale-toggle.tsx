'use client';

import { Fragment, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { locales, type Locale } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/routing';

/** Mono "EN / PT" switch. Moves to the same page under the other locale prefix. */
export function LocaleToggle() {
  const t = useTranslations('site.header');
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const changeLocale = (locale: Locale) => {
    if (locale === currentLocale) return;
    startTransition(() => router.replace(pathname, { locale }));
  };

  return (
    <div role="group" aria-label={t('language')} className="flex items-center gap-2 font-roboto-mono text-caption">
      {locales.map((locale, index) => (
        <Fragment key={locale}>
          {index > 0 && <span aria-hidden className="text-border-smoke">/</span>}
          <button
            type="button"
            onClick={() => changeLocale(locale)}
            disabled={isPending}
            aria-pressed={locale === currentLocale}
            className={`rounded-tag px-1.5 py-1 uppercase transition-colors disabled:opacity-50 ${
              locale === currentLocale ? 'text-console-white' : 'text-muted-ash hover:text-console-white'
            }`}
          >
            {locale}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
