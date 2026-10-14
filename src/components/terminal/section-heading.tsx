interface SectionHeadingProps {
  title: string;
  description?: string;
  /** `h1` on standalone pages, `h2` for home sections. */
  as?: 'h1' | 'h2';
}

/** Centered section opener: headline and one line of supporting text. */
export function SectionHeading({ title, description, as: Heading = 'h2' }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <Heading className="text-3xl font-bold tracking-[-0.02em] md:text-headline">{title}</Heading>
      {description && <p className="mt-4 text-subheading text-muted-ash">{description}</p>}
    </div>
  );
}
