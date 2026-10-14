import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/sections/mdx-components';
import { defaultLocale } from '@/i18n/config';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Compiles `content/projects/<slug>/<locale>.mdx` with the terminal MDX components.
 * Falls back to the default locale when a translation is missing; returns null when there is no file.
 * Runs at build time (the project pages are statically generated).
 */
export async function getProjectBody(slug: string, locale: string) {
  for (const candidate of new Set([locale, defaultLocale])) {
    try {
      const source = await readFile(path.join(CONTENT_DIR, 'projects', slug, `${candidate}.mdx`), 'utf8');
      const { content } = await compileMDX({ source, components: mdxComponents });
      return content;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    }
  }
  return null;
}
