import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { GhostLink, Portrait, Tag, Typewriter, getCvFile } from '@/components/terminal';
import { keepHyphenatedWords } from '@/lib/text';
import { entrance, rise } from './entrance';

const FOCUS_AREAS = ['React', 'TypeScript', 'Node.js', 'Ruby on Rails', 'E-commerce', 'SEO & performance'];

/** Centered opener: identity line, typed headline that cycles through what I build, CTA pair and focus tags. */
export function HomeHero() {
  const t = useTranslations('site.hero');
  const cv = getCvFile(useLocale());

  return (
    <section id="home" className="px-4 pt-16 md:px-6 md:pt-24">
      <div className="mx-auto flex max-w-[960px] flex-col items-center text-center">
        <div {...entrance(0, 'flex items-center gap-3 text-left')}>
          <Portrait size={40} priority />
          <p>
            <span className="block text-body-sm font-semibold">Cleyton Mendes</span>
            <span className="block font-roboto-mono text-caption text-muted-ash">{t('role')}</span>
          </p>
        </div>

        <h1 {...rise(100, 'mt-8 text-balance text-headline font-bold md:text-display')}>
          {/* Screen readers get one stable sentence; the typed lines are decorative. */}
          <span className="sr-only">{t('headlineSummary')}</span>
          <span aria-hidden className="block">
            {t('headlinePrefix')}
          </span>
          <Typewriter phrases={t.raw('phrases') as string[]} />
        </h1>

        <p {...rise(200, 'mt-6 max-w-2xl text-subheading text-muted-ash')}>
          {keepHyphenatedWords(t('description'))}
        </p>

        <div {...entrance(300, 'mt-10 flex flex-wrap items-center justify-center gap-4')}>
          <Button
            asChild
            className="h-12 rounded-tag px-6 text-base font-semibold hover:-translate-y-0.5 active:translate-y-0"
          >
            <a href="#contact">{t('contact')}</a>
          </Button>
          <GhostLink href={cv.href} download={cv.filename} arrow="down" className="h-12 px-4 text-base">
            {t('downloadCV')}
          </GhostLink>
        </div>

        <ul aria-label={t('tagsLabel')} className="mt-10 flex flex-wrap justify-center gap-2">
          {FOCUS_AREAS.map((area, index) => (
            <li key={area} {...entrance(400 + index * 60)}>
              <Tag>{area}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
