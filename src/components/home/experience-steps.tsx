'use client';

import { Fragment, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Reveal, SectionHeading } from '@/components/terminal';
import { ExperienceDetails } from '@/components/sections';
import { experiences } from '@/data/experience';
import { getStartYear } from '@/data/utils';

/** Oldest first, so the steps read left to right like a log. */
const timeline = [...experiences].reverse();

/**
 * Career timeline as bracketed workflow steps; the active step opens its log below.
 * All panels share one grid cell, so the block keeps the height of the tallest one and the
 * page below never jumps when switching steps. Panels crossfade with CSS.
 */
export function ExperienceSteps() {
  const t = useTranslations('site.experience');
  const [activeCompany, setActiveCompany] = useState(experiences[0].company);

  return (
    <section id="experience" className="scroll-mt-10 px-4 md:px-6">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading title={t('title')} description={t('description')} />

        <Reveal>
          <Tabs value={activeCompany} onValueChange={setActiveCompany}>
            <TabsList
              aria-label={t('stepsLabel')}
              className="flex h-auto w-full flex-wrap justify-center gap-x-3 gap-y-2 bg-transparent p-0 font-roboto-mono text-caption sm:gap-x-2"
            >
              {timeline.map((item, index) => (
                <Fragment key={item.company}>
                  {index > 0 && (
                    <span aria-hidden className="hidden text-border-smoke sm:inline">
                      |
                    </span>
                  )}
                  <TabsTrigger
                    value={item.company}
                    className="relative rounded-tag px-1 py-1 text-caption font-normal text-muted-ash transition-colors hover:text-console-white data-[state=active]:bg-transparent data-[state=active]:text-cursor-green data-[state=active]:shadow-none"
                  >
                    [{getStartYear(item.period)} {item.company}]
                    {item.company === activeCompany && (
                      <motion.span
                        layoutId="active-step"
                        aria-hidden
                        className="absolute inset-x-1 -bottom-0.5 h-px bg-cursor-green"
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                      />
                    )}
                  </TabsTrigger>
                </Fragment>
              ))}
            </TabsList>

            <div className="mx-auto mt-8 grid max-w-2xl">
              {experiences.map((item) => (
                <TabsContent
                  key={item.company}
                  value={item.company}
                  forceMount
                  className="group/panel col-start-1 row-start-1 mt-0 rounded-card border border-border-smoke bg-panel-charcoal p-6 transition-[opacity,translate,visibility] duration-300 data-[state=inactive]:invisible data-[state=inactive]:translate-y-2 data-[state=inactive]:opacity-0 motion-reduce:transition-none md:p-8"
                >
                  <ExperienceDetails item={item} />
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}
