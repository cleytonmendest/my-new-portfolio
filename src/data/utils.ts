import { LocalizedString } from './types';

export function getLocalizedText(
  text: LocalizedString,
  locale: string
): string {
  return text[locale as keyof LocalizedString] || text.en;
}

export function getLocalizedArray(
  array: LocalizedString[],
  locale: string
): string[] {
  return array.map((item) => getLocalizedText(item, locale));
}

/** Lowercase, hyphen separated identifier for anchors and keys. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
