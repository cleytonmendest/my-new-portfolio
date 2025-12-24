'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollProgress = (scrollTop / docHeight) * 100;

      setProgress(scrollProgress);
    };

    // Update on scroll
    window.addEventListener('scroll', updateProgress);

    // Initial calculation
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent/20 z-[60]"
      initial={{ opacity: 0 }}
      animate={{ opacity: progress > 0 ? 1 : 0 }}
    >
      <motion.div
        className="h-full bg-accent shadow-sm"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
}
