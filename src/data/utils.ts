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
