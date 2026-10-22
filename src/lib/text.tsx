import type { ReactNode } from 'react';

/**
 * Keeps hyphenated words such as "e-commerce" on one line: browsers may break right after the
 * hyphen ("e-" / "commerce"). Roboto has no non-breaking hyphen glyph, so the words are wrapped.
 */
export function keepHyphenatedWords(text: string): ReactNode[] {
  return text.split(/(\S+-\S+)/).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    )
  );
}
