'use client';

import { useEffect, useRef } from 'react';

interface HeroNameProps {
  first: string;
  last: string;
}

// Archivo's width axis, as font-stretch percentages. The name rests at 100% and leans
// between these as the pointer moves across the window.
const MIN_STRETCH = 88;
const MAX_STRETCH = 108;
const REST_STRETCH = 100;

/**
 * The hero name. It settles from condensed to normal width once on load (CSS, see
 * --animate-name-settle) and, on desktop with a mouse, follows the pointer's horizontal
 * position. Nothing moves with prefers-reduced-motion. It does not use an animation library,
 * so nothing extra is downloaded before the page is interactive.
 */
export function HeroName({ first, last }: HeroNameProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = ref.current;
    if (!heading) return;

    const interactive = window.matchMedia(
      '(prefers-reduced-motion: no-preference) and (hover: hover) and (min-width: 1024px)',
    );
    if (!interactive.matches) return;

    let current = REST_STRETCH;
    let target = REST_STRETCH;
    let frame = 0;

    // Eases the width toward the target; stops once it has arrived.
    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.05) current = target;
      heading.style.fontStretch = `${current}%`;
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };
    const moveTo = (value: number) => {
      target = value;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) =>
      moveTo(MIN_STRETCH + (MAX_STRETCH - MIN_STRETCH) * (event.clientX / window.innerWidth));
    const onPointerLeave = () => moveTo(REST_STRETCH);

    window.addEventListener('pointermove', onPointerMove);
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      cancelAnimationFrame(frame);
      heading.style.removeProperty('font-stretch');
    };
  }, []);

  return (
    <h1
      ref={ref}
      className="animate-name-settle text-display font-extrabold motion-reduce:animate-none"
    >
      <span className="block">{first}</span>
      <span className="block">{last}</span>
    </h1>
  );
}
