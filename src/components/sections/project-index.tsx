'use client';

import { useEffect, useState } from 'react';

interface ProjectIndexProps {
  items: { id: string; name: string }[];
}

/** The projects listed in the side rail, with the one in view marked. Large screens only. */
export function ProjectIndex({ items }: ProjectIndexProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );

    for (const item of items) {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <ul className="hidden space-y-2 lg:block">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={activeId === item.id ? 'true' : undefined}
            className={`text-sm transition-colors hover:text-foreground ${
              activeId === item.id ? 'font-medium text-foreground' : 'text-muted-foreground'
            }`}
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
