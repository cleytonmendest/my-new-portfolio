'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { StorefrontFrames } from '@/components/sections/storefront-frames';
import { hasWebGL } from '@/lib/webgl';

// three.js and react-three-fiber live in their own chunk, loaded only when the scene is used.
const HeroScene = dynamic(() => import('@/components/three/hero-scene'), { ssr: false });

/**
 * The hero's visual. The static storefront frames render first; on large screens with
 * WebGL, no reduced-motion preference and no data saver, the 3D scene loads after the
 * main content and takes over.
 */
export function HeroVisual() {
  const t = useTranslations('hero');
  const [use3d, setUse3d] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

    if (!wide || calm || saveData || !hasWebGL()) return;

    // Let the page become interactive before downloading the 3D chunk.
    const timer = window.setTimeout(() => setUse3d(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div role="img" aria-label={t('sceneLabel')} className="relative mx-auto w-full max-w-2xl">
      <div className={`transition-opacity duration-700 ${sceneReady ? 'opacity-0' : 'opacity-100'}`}>
        <StorefrontFrames />
      </div>
      {use3d && (
        <div className="absolute inset-0">
          <HeroScene onReady={() => setSceneReady(true)} />
        </div>
      )}
    </div>
  );
}
