import type { ReactNode } from 'react';

/**
 * The real root layouts (with <html>) are `[locale]/layout.tsx` for the portfolio and
 * `(legacy)/layout.tsx` for tools and legal pages. This one only exists so `not-found.tsx`
 * at the app root has a parent layout.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
