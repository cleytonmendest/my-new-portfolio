'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { hasWebGL } from '@/lib/webgl';

// Loaded only after a message was sent, so the 3D code costs nothing before that.
const ParcelScene = dynamic(() => import('@/components/three/parcel-scene'), { ssr: false });

interface SentConfirmationProps {
  title: string;
  message: string;
}

/** Confirmation after a message was sent: a box ships away (when motion is welcome), then text. */
export function SentConfirmation({ title, message }: SentConfirmationProps) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!calm && hasWebGL()) setPlaying(true);
  }, []);

  return (
    <div role="status" className="space-y-2 rounded-control border border-success p-6">
      {playing && (
        <div className="h-56" aria-hidden="true">
          <ParcelScene onDone={() => setPlaying(false)} />
        </div>
      )}
      <p className="font-semibold text-success">{title}</p>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
