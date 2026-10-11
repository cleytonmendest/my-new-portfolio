'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Languages } from 'lucide-react';
import { Link, routing, usePathname, useRouter, type Locale } from '@/i18n/routing';

// The language names are shown as codes: EN and PT are understood in any language.
export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();

  // Same page in the other language, keeping the section the visitor was reading. Without
  // JavaScript the link still works; it just opens the page from the top.
  const switchTo = (event: React.MouseEvent, next: Locale) => {
    event.preventDefault();
    router.replace(`${pathname}${window.location.hash}`, { locale: next });
  };

  return (
    <nav aria-label={t('language')} className="flex items-center gap-1">
      <Languages className="size-4 text-muted-foreground" aria-hidden="true" />
      {routing.locales.map((code) => (
        <Link
          key={code}
          href={pathname}
          locale={code}
          hrefLang={code}
          lang={code}
          aria-current={code === locale ? 'true' : undefined}
          onClick={(event) => switchTo(event, code)}
          className={`rounded-control px-2 py-1 text-sm font-medium uppercase transition-colors hover:text-foreground ${
            code === locale ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          {code}
        </Link>
      ))}
    </nav>
  );
}
