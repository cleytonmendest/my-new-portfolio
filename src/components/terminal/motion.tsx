'use client';

import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import {
  animate,
  motion,
  MotionConfig,
  useAnimationControls,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type Variants,
} from 'framer-motion';

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT, delay },
  }),
};

function isOffScreen(ref: RefObject<HTMLElement | null>) {
  const element = ref.current;
  if (!element) return false;
  const { top, bottom } = element.getBoundingClientRect();
  return bottom < 0 || top > window.innerHeight;
}

/** Honors the OS "reduce motion" setting for every framer animation on the page. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds before the entrance starts; use it to stagger siblings. */
  delay?: number;
}

/**
 * Fades and slides its content in when it scrolls into view.
 * The server HTML is fully visible (no JS needed to read it). After hydration, a block is hidden
 * only while it is completely off-screen, so it replays when it comes back but never vanishes
 * while someone is reading it.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (isOffScreen(ref)) {
      controls.set('hidden');
    }
  }, [isInView, controls]);

  return (
    <motion.div ref={ref} className={className} variants={revealVariants} custom={delay} initial={false} animate={controls}>
      {children}
    </motion.div>
  );
}

/** Counts up to `value` the first time it scrolls into view. Server HTML shows the final number. */
export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.6, once: true });
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(value);
  const display = useTransform(count, (current) => `${Math.round(current)}${suffix}`);

  // Start from zero only when the number is off-screen after hydration, so nobody sees it reset.
  useEffect(() => {
    if (!shouldReduceMotion && isOffScreen(ref)) count.set(0);
  }, [count, shouldReduceMotion]);

  useEffect(() => {
    if (!isInView || count.get() === value) return;
    const controls = animate(count, value, { duration: 1.4, ease: EASE_OUT });
    return () => controls.stop();
  }, [isInView, count, value]);

  return (
    <span ref={ref}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <motion.span aria-hidden>{display}</motion.span>
    </span>
  );
}
