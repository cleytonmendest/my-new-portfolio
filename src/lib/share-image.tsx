import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { SITE_URL } from '@/lib/metadata';

/** Open Graph size: what LinkedIn, X, WhatsApp and Slack show as a large preview. */
export const shareImageSize = { width: 1200, height: 630 };

// Terminal palette (see globals.css). The image is rendered by Satori, so styles are inline.
const COLORS = { canvas: '#0a0a0a', border: '#353535', muted: '#8d8d8d', mist: '#d9d9d9', white: '#fafafa', green: '#27f795' };

// WOFF, not WOFF2: Satori reads TTF, OTF and WOFF. Licenses next to the files (SIL OFL 1.1).
const FONTS_DIR = path.join(process.cwd(), 'src/assets/fonts');

async function loadFonts() {
  const [regular, bold, mono] = await Promise.all(
    ['roboto-latin-400-normal.woff', 'roboto-latin-700-normal.woff', 'roboto-mono-latin-400-normal.woff'].map((file) =>
      readFile(path.join(FONTS_DIR, file))
    )
  );
  return [
    { name: 'Roboto', data: regular, weight: 400 as const, style: 'normal' as const },
    { name: 'Roboto', data: bold, weight: 700 as const, style: 'normal' as const },
    { name: 'Roboto Mono', data: mono, weight: 400 as const, style: 'normal' as const },
  ];
}

/** Cuts long text at a word boundary so it fits a few lines of the card. */
function clamp(text: string, max: number) {
  return text.length <= max ? text : `${text.slice(0, max).replace(/\s+\S*$/, '')}…`;
}

interface ShareImageContent {
  /** Small mono line above the title, shown in brackets. */
  label: string;
  title: string;
  text?: string;
  tags?: string[];
}

/**
 * Share card in the terminal design: wordmark, bracketed label, title, optional text and tags, and
 * the site's host on a hairline footer. Used by the opengraph-image routes.
 */
export async function renderShareImage({ label, title, text, tags }: ShareImageContent) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          backgroundColor: COLORS.canvas,
          color: COLORS.white,
          fontFamily: 'Roboto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 700 }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={COLORS.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7 11 2-2-2-2" />
            <path d="M11 13h4" />
            <rect width="18" height="18" x="3" y="3" rx="2" />
          </svg>
          cleyton mendes
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontFamily: 'Roboto Mono', fontSize: 26, color: COLORS.green }}>{`[${label}]`}</div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.02em' }}>{clamp(title, 80)}</div>
          {text && <div style={{ fontSize: 30, lineHeight: 1.4, color: COLORS.muted }}>{clamp(text, 150)}</div>}
          {tags && (
            <div style={{ display: 'flex', gap: 12 }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontFamily: 'Roboto Mono',
                    fontSize: 22,
                    color: COLORS.mist,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 4,
                    padding: '6px 14px',
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            borderTop: `1px solid ${COLORS.border}`,
            paddingTop: 24,
            fontFamily: 'Roboto Mono',
            fontSize: 22,
            color: COLORS.muted,
          }}
        >
          {new URL(SITE_URL).host}
        </div>
      </div>
    ),
    { ...shareImageSize, fonts: await loadFonts() }
  );
}
