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

/** First four-digit year in a period like "Oct 2021 - Oct 2023". */
export function getStartYear(period: LocalizedString): string {
  return period.en.match(/\d{4}/)?.[0] ?? '';
}
