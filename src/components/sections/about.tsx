import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';

export function About() {
  const t = useTranslations('about');

  return (
    <Section id="about" title={t('title')}>
      <div className="grid gap-10 md:grid-cols-3">
        <div className="relative aspect-4/5 overflow-hidden rounded-media border border-input bg-muted md:col-span-1">
          <Image
            src="/about/cleyton.webp"
            alt={t('photoAlt')}
            fill
            sizes="(min-width: 768px) 280px, 100vw"
            className="object-cover grayscale"
          />
        </div>
        <div className="max-w-prose space-y-6 font-serif text-lg leading-relaxed md:col-span-2">
          <p>{t('p1')}</p>
          <p className="text-muted-foreground">{t('p2')}</p>
        </div>
      </div>
    </Section>
  );
}
