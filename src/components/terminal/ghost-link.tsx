import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// The arrow nudges when the link itself (group/link) or its card (group) is hovered.
const ARROWS = {
  right: { Icon: ArrowRight, nudge: 'group-hover:translate-x-0.5 group-hover/link:translate-x-0.5' },
  'up-right': {
    Icon: ArrowUpRight,
    nudge:
      'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5',
  },
  down: { Icon: ArrowDown, nudge: 'group-hover:translate-y-0.5 group-hover/link:translate-y-0.5' },
};

interface GhostLinkProps {
  href: string;
  children: ReactNode;
  arrow?: keyof typeof ARROWS;
  /** Opens in a new tab. */
  external?: boolean;
  /** File name to download instead of navigating. */
  download?: string;
  className?: string;
}

/** Green text link with an underline that grows on hover and an arrow that nudges. */
export function GhostLink({ href, children, arrow, external = false, download, className }: GhostLinkProps) {
  const classes = cn('group/link inline-flex items-center gap-1 text-cursor-green', className);
  const icon = arrow && ARROWS[arrow];
  const content = (
    <>
      <span className="link-underline">{children}</span>
      {icon && <icon.Icon aria-hidden className={cn('size-[1em] shrink-0 transition-transform duration-200', icon.nudge)} />}
    </>
  );

  if (href.startsWith('/') && !download) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      download={download}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={classes}
    >
      {content}
    </a>
  );
}
