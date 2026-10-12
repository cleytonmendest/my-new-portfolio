import Image from 'next/image';

interface PortraitProps {
  /** Diameter in pixels. */
  size: number;
  priority?: boolean;
}

/**
 * Small circular grayscale portrait, cropped on the face of the full-body photo.
 * Decorative: always rendered next to the name, so it has an empty alt.
 */
export function Portrait({ size, priority = false }: PortraitProps) {
  return (
    <span
      className="relative block shrink-0 overflow-hidden rounded-full border border-border-smoke bg-card-graphite"
      style={{ width: size, height: size }}
    >
      <Image
        src="/cleyton-mendes.png"
        alt=""
        width={827}
        height={1016}
        sizes={`${Math.round(size * 2.8)}px`}
        priority={priority}
        className="absolute left-[-92%] top-0 h-auto w-[276%] max-w-none grayscale"
      />
    </span>
  );
}
