'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { setLocale } from '@/actions/locale';
import { localeNames, type Locale } from '@/i18n/config';
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
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    startTransition(async () => {
      await setLocale(newLocale);
      // Force refresh to apply new locale
      window.location.reload();
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
