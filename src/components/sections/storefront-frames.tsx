import Image from 'next/image';

// Two real storefronts as floating browser windows. This is the static version of the hero
// scene: it is what renders first, on small screens, with reduced motion and without WebGL.
const frames = [
  {
    src: '/hero/ultrafeu-top.webp',
    className: 'left-0 top-2 w-3/5 -rotate-6',
  },
  {
    src: '/hero/tiffany-top.webp',
    className: 'bottom-0 right-0 z-10 w-3/5 rotate-3',
  },
];

export function StorefrontFrames() {
  return (
    <div className="relative mx-auto aspect-4/3 w-full max-w-2xl">
      {frames.map((frame) => (
        <div
          key={frame.src}
          className={`absolute aspect-4/3 overflow-hidden rounded-media border border-input bg-paper shadow-popover ${frame.className}`}
        >
          <Image
            src={frame.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 320px, 60vw"
            className="object-cover object-top"
            quality={60}
            priority
          />
        </div>
      ))}
    </div>
  );
}
