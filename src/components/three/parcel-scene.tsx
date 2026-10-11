'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { getToken } from '@/lib/design-tokens';

// Timeline of the confirmation, in seconds.
const CLOSE_END = 0.7;
const TAPE_END = 1.0;
const LEAVE_START = 1.2;
const LEAVE_END = 2.2;

const easeOut = (value: number) => 1 - Math.pow(1 - Math.min(Math.max(value, 0), 1), 3);
const easeIn = (value: number) => Math.pow(Math.min(Math.max(value, 0), 1), 3);

interface ParcelProps {
  boxColor: string;
  tapeColor: string;
  onDone: () => void;
}

/** A box that closes, gets taped and leaves the scene to the right. */
function Parcel({ boxColor, tapeColor, onDone }: ParcelProps) {
  const root = useRef<Group>(null);
  const flapLeft = useRef<Group>(null);
  const flapRight = useRef<Group>(null);
  const tape = useRef<Group>(null);
  const finished = useRef(false);

  useFrame(({ clock }) => {
    if (!root.current || !flapLeft.current || !flapRight.current || !tape.current) return;
    const time = clock.elapsedTime;

    // Flaps swing from open to closed.
    const closed = easeOut(time / CLOSE_END);
    flapLeft.current.rotation.z = (1 - closed) * 1.9;
    flapRight.current.rotation.z = -(1 - closed) * 1.9;

    // Tape appears across the top.
    tape.current.scale.x = easeOut((time - CLOSE_END) / (TAPE_END - CLOSE_END));

    // A small settle, then the box leaves to the right.
    const leave = easeIn((time - LEAVE_START) / (LEAVE_END - LEAVE_START));
    root.current.position.x = leave * 7;
    root.current.rotation.z = -leave * 0.25;
    root.current.scale.y = 1 - 0.06 * Math.sin(Math.min(Math.max((time - TAPE_END) / 0.2, 0), 1) * Math.PI);

    if (time >= LEAVE_END && !finished.current) {
      finished.current = true;
      onDone();
    }
  });

  return (
    <group ref={root} rotation={[0.55, -0.6, 0]}>
      <mesh>
        <boxGeometry args={[1.6, 1, 1.2]} />
        <meshStandardMaterial color={boxColor} roughness={0.7} />
      </mesh>
      {/* Hinges sit on the top edges; each flap extends inward from its hinge. */}
      <group ref={flapLeft} position={[-0.8, 0.5, 0]}>
        <mesh position={[0.4, 0, 0]}>
          <boxGeometry args={[0.8, 0.04, 1.2]} />
          <meshStandardMaterial color={boxColor} roughness={0.7} />
        </mesh>
      </group>
      <group ref={flapRight} position={[0.8, 0.5, 0]}>
        <mesh position={[-0.4, 0, 0]}>
          <boxGeometry args={[0.8, 0.04, 1.2]} />
          <meshStandardMaterial color={boxColor} roughness={0.7} />
        </mesh>
      </group>
      <group ref={tape} position={[0, 0.53, 0]} scale={[0, 1, 1]}>
        <mesh>
          <boxGeometry args={[1.6, 0.02, 0.28]} />
          <meshStandardMaterial color={tapeColor} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

export default function ParcelScene({ onDone }: { onDone: () => void }) {
  const [colors, setColors] = useState<{ box: string; tape: string } | null>(null);

  useEffect(() => {
    setColors({ box: getToken('--accent'), tape: getToken('--accent-foreground') });
  }, []);

  if (!colors) return null;

  return (
    <Canvas
      camera={{ position: [0, 0.3, 5.2], fov: 35 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} />
      <directionalLight position={[-4, 1, 2]} intensity={0.5} />
      <Parcel boxColor={colors.box} tapeColor={colors.tape} onDone={onDone} />
    </Canvas>
  );
}
