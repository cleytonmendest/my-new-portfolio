import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  /** Extra content under the title in the side rail, for example an index. */
  rail?: ReactNode;
  children: ReactNode;
}

/**
 * A page section with its name in a side rail on large screens and above the content on
 * small ones. The rail stays in view while a long section scrolls.
 */
export function Section({ id, title, rail, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-16 border-t border-border py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
          <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight">
            {title}
          </h2>
          {rail}
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}
