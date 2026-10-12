import type { ComponentProps } from 'react';
import type { MDXComponents } from 'mdx/types';

/** Terminal styles for the elements MDX content produces (case studies, and later blog posts). */
export const mdxComponents: MDXComponents = {
  h2: (props: ComponentProps<'h2'>) => (
    <h2 className="mt-12 text-heading-sm font-semibold first:mt-0" {...props} />
  ),
  h3: (props: ComponentProps<'h3'>) => <h3 className="mt-8 text-subheading font-semibold" {...props} />,
  p: (props: ComponentProps<'p'>) => <p className="mt-4 text-body text-highlight-mist" {...props} />,
  ul: (props: ComponentProps<'ul'>) => <ul className="mt-4 space-y-2" {...props} />,
  ol: (props: ComponentProps<'ol'>) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 marker:font-roboto-mono marker:text-muted-ash" {...props} />
  ),
  li: ({ children, ...props }: ComponentProps<'li'>) => (
    <li className="flex gap-3 text-body text-highlight-mist in-[ol]:list-item" {...props}>
      <span aria-hidden className="font-roboto-mono text-muted-ash in-[ol]:hidden">
        &gt;
      </span>
      <span>{children}</span>
    </li>
  ),
  a: ({ href = '', ...props }: ComponentProps<'a'>) => {
    const isExternal = href.startsWith('http');
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="text-cursor-green underline-offset-4 hover:underline"
        {...props}
      />
    );
  },
  strong: (props: ComponentProps<'strong'>) => <strong className="font-semibold text-console-white" {...props} />,
  code: (props: ComponentProps<'code'>) => (
    <code
      className="rounded-tag bg-card-graphite px-1.5 py-0.5 font-roboto-mono text-[0.9em] text-console-white"
      {...props}
    />
  ),
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote className="mt-6 border-l border-cursor-green pl-6 text-subheading text-highlight-mist" {...props} />
  ),
};
