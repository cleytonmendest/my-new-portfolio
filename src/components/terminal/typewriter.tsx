'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const TYPE_MS = 55;
const DELETE_MS = 25;
const HOLD_MS = 2600;
const GAP_MS = 350;

/** Green block cursor. An inline span holding a no-break space, so it never wraps away from the text. */
function Cursor({ blinking }: { blinking: boolean }) {
  return (
    <span className={`ml-2 bg-cursor-green px-[0.1em] ${blinking ? 'animate-blink motion-reduce:animate-none' : ''}`}>
      {' '}
    </span>
  );
}

/**
 * Types a phrase, holds it, deletes it and moves to the next one, like a terminal prompt.
 * - The server HTML shows the first phrase in full, so the page reads fine before (or without) JS.
 * - Every phrase is also laid out invisibly in the same grid cell: the block keeps the height of the
 *   longest phrase and nothing below it moves.
 * - Pauses while off-screen; with "reduce motion" it stays on the first phrase.
 * Decorative (aria-hidden): give screen readers the full meaning in a sibling sr-only text.
 */
export function Typewriter({ phrases }: { phrases: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref);
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(phrases[0].length);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrase = phrases[index];
  const isComplete = length === phrase.length;

  useEffect(() => {
    if (shouldReduceMotion || !isInView || phrases.length < 2) return;

    let delay: number;
    let step: () => void;
    if (isDeleting && length === 0) {
      delay = GAP_MS;
      step = () => {
        setIsDeleting(false);
        setIndex((index + 1) % phrases.length);
      };
    } else if (isDeleting) {
      delay = DELETE_MS;
      step = () => setLength(length - 1);
    } else if (isComplete) {
      delay = HOLD_MS;
      step = () => setIsDeleting(true);
    } else {
      delay = TYPE_MS;
      step = () => setLength(length + 1);
    }

    const timer = window.setTimeout(step, delay);
    return () => window.clearTimeout(timer);
  }, [index, length, isDeleting, isComplete, isInView, shouldReduceMotion, phrases.length]);

  return (
    <span ref={ref} aria-hidden className="grid">
      {phrases.map((item) => (
        <span key={item} className="invisible col-start-1 row-start-1">
          {item}
          <Cursor blinking={false} />
        </span>
      ))}
      <span className="col-start-1 row-start-1">
        {phrase.slice(0, length)}
        <Cursor blinking={!isDeleting && isComplete} />
      </span>
    </span>
  );
}
