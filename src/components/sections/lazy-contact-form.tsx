'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const ContactForm = dynamic(() => import('@/components/sections/contact-form'), { ssr: false });

/**
 * Mounts the contact form (and downloads react-hook-form and zod) only when the visitor is
 * about to reach it. The placeholder keeps the form's space so nothing jumps.
 */
export function LazyContactForm() {
  const placeholder = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const element = placeholder.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin: '100% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return near ? <ContactForm /> : <div ref={placeholder} className="min-h-120" aria-hidden="true" />;
}
