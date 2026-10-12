import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { locales } from '@/i18n/config';
import { SITE_URL } from '@/lib/metadata';

const PAGES = ['', '/experience', '/projects', '/education', ...projects.map((project) => `/projects/${project.slug}`)];

/** Every portfolio page in every locale, each entry listing its translations as hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((item) => [item, `${SITE_URL}/${item}${path}`])),
      },
    }))
  );
}
