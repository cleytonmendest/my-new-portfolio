import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { locales } from '@/i18n/config';
import { SITE_URL } from '@/lib/metadata';

const PAGES = ['', '/experience', '/projects', '/education', ...projects.map((project) => `/projects/${project.slug}`)];

/**
 * Every portfolio page in every locale, each entry listing its translations as hreflang alternates.
 * No lastModified: the build time would mark every page as changed on every deploy, and search
 * engines learn to ignore dates that are always new.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((item) => [item, `${SITE_URL}/${item}${path}`])),
      },
    }))
  );
}
