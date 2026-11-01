function cascade(animationClass: string, delayMs: number, className: string) {
  return {
    className: `${animationClass} motion-reduce:animate-none ${className}`.trim(),
    style: { animationDelay: `${delayMs}ms` },
  };
}

/**
 * Props for the page-load cascade above the fold. CSS keyframes (not JS), so it plays on first
 * paint, before hydration, and stays visible if JavaScript never loads.
 */
export function entrance(delayMs: number, className = '') {
  return cascade('animate-fade-up', delayMs, className);
}

/**
 * The same cascade without the fade, for the hero headline and summary. Browsers do not count text
 * painted at opacity 0 as the Largest Contentful Paint, so fading them in moved the home's LCP to
 * the first time the typewriter changed the headline (3.2 s on mobile).
 */
export function rise(delayMs: number, className = '') {
  return cascade('animate-rise', delayMs, className);
}
