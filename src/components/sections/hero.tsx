import { useLocale, useTranslations } from 'next-intl';
import { Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { HeroName } from '@/components/motion/hero-name';
import { HeroVisual } from '@/components/sections/hero-visual';
import { personalInfo } from '@/data/personal';

export function Hero() {
  const t = useTranslations('hero');
  const tContact = useTranslations('contact.info');
  const locale = useLocale();
  const [first, ...rest] = t('name').split(' ');

  return (
    <section id="home" className="flex min-h-svh items-center pb-16 pt-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        <div>
          <HeroName first={first} last={rest.join(' ')} />
          <p className="mt-6 text-2xl font-semibold">{t('title')}</p>
          <p className="mt-4 max-w-md font-serif text-lg leading-relaxed text-muted-foreground">
            {t('tagline')}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="accent" size="lg">
              <Link href="/#contact">
                <Mail />
                {t('cta.contact')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={`/cleyton-mendes-${locale}.pdf`} download>
                <Download />
                {t('cta.downloadCV')}
              </a>
            </Button>
          </div>

          <p className="mt-10 text-sm text-muted-foreground">
            {personalInfo.location.city}, {personalInfo.location.state}. {tContact('locationValue')}
          </p>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
