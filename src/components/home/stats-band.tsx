import { useLocale, useTranslations } from 'next-intl';
import { CountUp, Reveal } from '@/components/terminal';
import { brands, stats } from '@/data/personal';

const STATS = [
  { key: 'years', value: stats.yearsOfExperience, suffix: '+' },
  { key: 'brands', value: brands.length, suffix: '' },
  { key: 'platforms', value: 3, suffix: '' },
] as const;

/** "Tiffany & Co., Hugo Boss, … and Candide", localized, with the first brand in green. Names never break. */
function BrandList({ locale }: { locale: string }) {
  const parts = new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).formatToParts(brands);
  return (
    <>
      {parts.map((part, index) =>
        part.type === 'element' ? (
          <span
            key={index}
            className={part.value === brands[0] ? 'whitespace-nowrap text-cursor-green' : 'whitespace-nowrap'}
          >
            {part.value}
          </span>
        ) : (
          part.value
        )
      )}
    </>
  );
}

/** Career summary naming the brands, counting mono stats and a short statement on how I work. */
export function StatsBand() {
  const t = useTranslations('site.stats');
  const locale = useLocale();

  return (
    <section className="px-4 md:px-6">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-heading-sm text-console-white">
            {t.rich('summary', { brands: () => <BrandList locale={locale} /> })}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal>
            <dl className="divide-y divide-border-smoke border-y border-border-smoke">
              {STATS.map((stat) => (
                <div key={stat.key} className="flex items-baseline gap-4 py-6">
                  <dt className="order-2 font-roboto-mono text-caption uppercase text-muted-ash">{t(stat.key)}</dt>
                  <dd className="order-1 min-w-[3ch] font-roboto-mono text-stat text-cursor-green">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="border-l border-cursor-green pl-6 text-subheading text-highlight-mist">{t('statement')}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
