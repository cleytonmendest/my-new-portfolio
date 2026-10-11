'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { localeNames, usePathname, useRouter, type Locale } from '@/i18n/routing';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    // Same page in the other language, keeping the section the visitor was reading.
    startTransition(() => {
      router.replace(`${pathname}${window.location.hash}`, { locale: newLocale });
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      <Select
        value={locale}
        onValueChange={(value) => handleLocaleChange(value as Locale)}
        disabled={isPending}
      >
        <SelectTrigger className="h-9 w-auto gap-2" aria-label={t('language')}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(localeNames).map(([code, name]) => (
            <SelectItem key={code} value={code}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
