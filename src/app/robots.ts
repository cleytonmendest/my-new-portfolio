import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';

/** Allow everything and point crawlers to the sitemap on the current site URL. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
