'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const TYPE_MS = 55;
const DELETE_MS = 25;
const HOLD_MS = 2600;
const GAP_MS = 350;

/**
 * Green block cursor: an empty inline span, so it has the height of the text. Its negative right
 * margin cancels its gap and width, so it takes no room in the line and the text never reflows while
 * it moves. (An absolutely positioned cursor would be simpler, but it makes Chrome's text-balance
 * add a line.)
 */
function Cursor({ blinking }: { blinking: boolean }) {
  return (
    <span
      className={`-mr-[calc(0.5rem+0.43em)] ml-2 bg-cursor-green pl-[0.43em] ${blinking ? 'animate-blink motion-reduce:animate-none' : ''}`}
    />
  );
}

/** Room for the cursor at the end of a phrase (its gap plus its width), glued to the last word. */
function CursorRoom() {
  return <span className="pl-[calc(0.5rem+0.43em)]" />;
}

/**
 * Types a phrase, holds it, deletes it and moves to the next one, like a terminal prompt.
 * - The server HTML shows the first phrase in full, so the page reads fine before (or without) JS.
 * - The whole phrase is always laid out, with the part not typed yet invisible: letters appear in
 *   their final place and lines never reflow while typing, so `text-balance` on a parent is safe.
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
    // The cursor can stick out past the right edge for a moment while typing at the end of a long
    // line; clip it there instead of letting it widen the page on phones.
    <span ref={ref} aria-hidden className="grid overflow-x-clip">
      {phrases.map((item) => (
        <span key={item} className="invisible col-start-1 row-start-1">
          {item}
          <CursorRoom />
        </span>
      ))}
      <span className="col-start-1 row-start-1">
        {phrase.slice(0, length)}
        <Cursor blinking={!isDeleting && isComplete} />
        <span className="invisible">{phrase.slice(length)}</span>
        <CursorRoom />
      </span>
    </span>
  );
}
