'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { SRGBColorSpace, TextureLoader, type Group, type Texture } from 'three';
import { useTheme } from 'next-themes';
import { getToken } from '@/lib/design-tokens';

// Every window shows a 4:3 band of a real storefront capture.
const WIDTH = 3.2;
const HEIGHT = 2.4;

interface WindowSpec {
  /** A 4:3 capture of a real storefront (public/hero). */
  src: string;
  position: [number, number, number];
  rotation: [number, number, number];
  /** Offsets the floating motion so the windows do not move in sync. */
  phase: number;
}

const windows: WindowSpec[] = [
  { src: '/hero/ultrafeu-top.webp', position: [-1.8, 0.8, -1.4], rotation: [0, 0.32, -0.05], phase: 0 },
  { src: '/hero/tiffany-top.webp', position: [0.3, -0.3, 0], rotation: [0, -0.12, 0.03], phase: 2 },
  { src: '/hero/ultrafeu-grid.webp', position: [2.1, 1, -1.9], rotation: [0, -0.38, 0.04], phase: 4 },
];

const textureUrls = windows.map((item) => item.src);

function StorefrontWindow({
  spec,
  texture,
  borderColor,
}: {
  spec: WindowSpec;
  texture: Texture;
  borderColor: string;
}) {
  const group = useRef<Group>(null);

  // The captures are sRGB images.
  useEffect(() => {
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 4;
    texture.needsUpdate = true;
  }, [texture]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = spec.position[1] + Math.sin(clock.elapsedTime * 0.6 + spec.phase) * 0.08;
  });

  return (
    <group ref={group} position={spec.position} rotation={spec.rotation}>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[WIDTH + 0.06, HEIGHT + 0.06]} />
        <meshBasicMaterial color={borderColor} toneMapped={false} />
      </mesh>
      <mesh>
        <planeGeometry args={[WIDTH, HEIGHT]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Leans the whole group toward the pointer with a little damping. */
function PointerRig({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);

  useFrame(({ pointer }, delta) => {
    if (!group.current) return;
    const ease = Math.min(1, delta * 3);
    group.current.rotation.x += (pointer.y * -0.12 - group.current.rotation.x) * ease;
    group.current.rotation.y += (pointer.x * 0.2 - group.current.rotation.y) * ease;
  });

  return <group ref={group}>{children}</group>;
}

function Windows({ onReady }: { onReady: () => void }) {
  const textures = useLoader(TextureLoader, textureUrls);
  const { resolvedTheme } = useTheme();
  const [borderColor, setBorderColor] = useState('');

  // The border follows the design token, so it adapts to the light and dark themes.
  useEffect(() => {
    setBorderColor(getToken('--input'));
  }, [resolvedTheme]);

  useEffect(() => {
    onReady();
  }, [onReady]);

  if (!borderColor) return null;

  return (
    <PointerRig>
      {windows.map((spec, index) => (
        <StorefrontWindow
          key={index}
          spec={spec}
          texture={textures[index]}
          borderColor={borderColor}
        />
      ))}
    </PointerRig>
  );
}

interface HeroSceneProps {
  /** Called once the textures are loaded and the windows are in the scene. */
  onReady: () => void;
}

export default function HeroScene({ onReady }: HeroSceneProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stops rendering while the hero is off screen.
  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 11], fov: 30 }}
        dpr={[1, 1.5]}
        frameloop={visible ? 'always' : 'never'}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <Suspense fallback={null}>
          <Windows onReady={onReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}
