import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';

/** Outlined mono badge used for categories and technologies. Not interactive, so no hover state. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <Badge
      variant="outline"
      className="rounded-tag border-border-smoke bg-transparent px-3 py-1 font-roboto-mono text-caption font-normal text-highlight-mist"
    >
      {children}
    </Badge>
  );
}
