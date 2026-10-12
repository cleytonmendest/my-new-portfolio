/**
 * Props for the page-load cascade above the fold. CSS keyframes (not JS), so it plays on first
 * paint, before hydration, and stays visible if JavaScript never loads.
 */
export function entrance(delayMs: number, className = '') {
  return {
    className: `animate-fade-up motion-reduce:animate-none ${className}`.trim(),
    style: { animationDelay: `${delayMs}ms` },
  };
}
