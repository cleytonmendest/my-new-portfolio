import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { skillsData } from '@/data/skills';

export function Skills() {
  const t = useTranslations('skills');

  return (
    <Section id="skills" title={t('title')}>
      <dl>
        {skillsData.map((group) => (
          <div
            key={group.category}
            className="grid gap-2 border-t border-border py-6 first:border-t-0 first:pt-0 sm:grid-cols-4"
          >
            <dt className="text-sm text-muted-foreground sm:col-span-1">
              {t(`categories.${group.category}`)}
            </dt>
            <dd className="text-lg sm:col-span-3">{group.skills.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
