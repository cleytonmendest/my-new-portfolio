import { getTranslations } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

export default async function NotFoundPage() {
  const t = await getTranslations('notFound');

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex flex-1 flex-col items-start justify-center gap-4 px-4 py-32 mx-auto w-full max-w-3xl">
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <p className="font-serif text-lg text-muted-foreground">{t('description')}</p>
        <Button asChild>
          <Link href="/">{t('back')}</Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}
