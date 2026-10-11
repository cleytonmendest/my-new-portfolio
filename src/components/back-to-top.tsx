'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the button once the page is scrolled down 300px
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`fixed bottom-24 right-8 z-50 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="h-12 w-12 rounded-full"
        aria-label="Back to top"
        tabIndex={isVisible ? 0 : -1}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
}
