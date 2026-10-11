'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface ScrollFrameProps {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/**
 * A fixed-height frame showing a tall page capture. As the page scrolls past, the capture
 * scrolls inside the frame, so the visitor sees the whole storefront. GSAP and ScrollTrigger
 * are downloaded only once a frame is about to be seen, and with prefers-reduced-motion the
 * capture stays at its top.
 */
export function ScrollFrame({ src, width, height, alt }: ScrollFrameProps) {
  const frame = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const frameElement = frame.current;
    const imageElement = image.current;
    if (!frameElement || !imageElement) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const start = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const travel = () => Math.max(0, imageElement.offsetHeight - frameElement.clientHeight);
      const tween = gsap.fromTo(
        imageElement,
        { y: 0 },
        {
          y: () => -travel(),
          ease: 'none',
          scrollTrigger: {
            trigger: frameElement,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );
      // The capture's height is only known once it has loaded.
      imageElement.addEventListener('load', () => ScrollTrigger.refresh());
      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    };

    // Starts loading the libraries half a screen ahead of the frame.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        void start();
      },
      { rootMargin: '50% 0px' },
    );
    observer.observe(frameElement);

    return () => {
      cancelled = true;
      observer.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={frame}
      className="relative h-96 overflow-hidden rounded-media border border-input bg-paper md:h-112"
    >
      <Image
        ref={image}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1280px) 520px, (min-width: 768px) 70vw, 100vw"
        className="h-auto w-full max-w-none"
      />
    </div>
  );
}
