'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export function CopyEmailButton({ email }: { email: string }) {
  const t = useTranslations('contact');
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success(t('copied'), { duration: 2000 });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t('copyError'));
    }
  };

  return (
    <Button variant="ghost" size="icon-sm" onClick={copy} aria-label={t('copy')}>
      {copied ? <Check /> : <Copy />}
    </Button>
  );
}
