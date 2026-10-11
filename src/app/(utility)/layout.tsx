import { getMessages, setRequestLocale } from 'next-intl/server';
import { RootShell } from '@/components/root-shell';

// Personal utility pages (/tools, /whatsapp-bot) and the design system documentation.
// They are Portuguese-only, keep their historical URLs (no /pt prefix) and are not touched by
// the locale proxy, so the locale is fixed here.
const locale = 'pt';

export default async function UtilityLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <RootShell lang="pt-BR" locale={locale} messages={messages}>
      {children}
    </RootShell>
  );
}
