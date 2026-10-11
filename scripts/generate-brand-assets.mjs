/*
 * Generates the icon pack and the Open Graph images from the "CM" monogram.
 *
 *   npm run brand-assets
 *
 * Needs Chromium (`npx playwright install chromium`) and network access for Google Fonts.
 * Colours mirror the palette documented in src/styles/tokens.css (Breu, Névoa, Âmbar, Folha).
 * Output is committed, so this only runs when the monogram, the title or the tagline change.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const colors = { breu: '#111713', nevoa: '#EEF1EC', ambar: '#E6972E', folha: '#9DAAA1' };
const siteHost = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cleyton-mendes.com').host;

const fontLinks = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Source+Serif+4:wght@400&display=swap" rel="stylesheet">`;

/**
 * Browser icons get rounded corners. That also makes the PNG carry an alpha channel, which the
 * ICO decoder in Next requires. App icons (Apple, Android) stay full-bleed because the OS masks them.
 */
function iconHtml(size, rounded) {
  // Below 48px the bar would be a blur, so the letters get the room instead.
  const small = size < 48;
  const fontSize = size * (small ? 0.62 : 0.4);
  return `<!doctype html><html><head>${fontLinks}<style>
    * { margin: 0; box-sizing: border-box; }
    html, body { width: ${size}px; height: ${size}px; background: transparent; }
    .tile { width: 100%; height: 100%; background: ${colors.breu}; border-radius: ${rounded ? size * 0.22 : 0}px; display: grid; place-content: center; justify-items: center; gap: ${size * 0.04}px; }
    .mark { font: 800 ${fontSize}px/1 Archivo; font-stretch: 112%; letter-spacing: -0.02em; color: ${colors.nevoa}; }
    .bar { width: ${size * 0.22}px; height: ${size * 0.045}px; background: ${colors.ambar}; display: ${small ? 'none' : 'block'}; }
  </style></head><body><div class="tile"><div class="mark">CM</div><div class="bar"></div></div></body></html>`;
}

function ogHtml({ title, tagline }) {
  const [first, ...rest] = (process.env.OG_NAME ?? 'Cleyton Mendes').split(' ');
  return `<!doctype html><html><head>${fontLinks}<style>
    * { margin: 0; box-sizing: border-box; }
    body { width: 1200px; height: 630px; background: ${colors.breu}; color: ${colors.nevoa}; padding: 64px 88px; display: flex; flex-direction: column; justify-content: space-between; }
    .block { display: flex; gap: 40px; align-items: stretch; }
    .rule { width: 10px; background: ${colors.ambar}; flex: none; }
    h1 { font: 800 124px/0.94 Archivo; font-stretch: 100%; letter-spacing: -0.03em; }
    .role { font: 600 36px/1.2 Archivo; margin-top: 24px; }
    .tagline { font: 400 30px/1.45 'Source Serif 4'; color: ${colors.folha}; max-width: 760px; }
    .host { font: 500 26px/1 Archivo; color: ${colors.folha}; white-space: nowrap; }
    .mark { font: 800 34px/1 Archivo; font-stretch: 112%; letter-spacing: -0.02em; }
  </style></head><body>
    <div class="mark">CM</div>
    <div class="block"><div class="rule"></div><div><h1>${first}<br>${rest.join(' ')}</h1><p class="role">${title}</p></div></div>
    <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:48px"><p class="tagline">${tagline}</p><span class="host">${siteHost}</span></div>
  </body></html>`;
}

/** ICO container with PNG images inside (supported by every current browser). */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

const browser = await chromium.launch();

async function shoot(html, width, height) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // omitBackground makes Playwright write RGBA PNGs, which the ICO decoder in Next requires.
  const png = await page.screenshot({ clip: { x: 0, y: 0, width, height }, omitBackground: true });
  await page.close();
  return png;
}

const icons = [
  ['public/favicon-16x16.png', 16, true],
  ['public/favicon-32x32.png', 32, true],
  ['public/apple-touch-icon.png', 180, false],
  ['public/android-chrome-192x192.png', 192, false],
  ['public/android-chrome-512x512.png', 512, false],
];
const rendered = new Map();
for (const [path, size, rounded] of icons) {
  const png = await shoot(iconHtml(size, rounded), size, size);
  rendered.set(size, png);
  await writeFile(path, png);
  console.log(path, `${size}x${size}`, `${(png.length / 1024).toFixed(1)} KB`);
}
const png48 = await shoot(iconHtml(48, true), 48, 48);
const ico = buildIco([
  { size: 16, data: rendered.get(16) },
  { size: 32, data: rendered.get(32) },
  { size: 48, data: png48 },
]);
await writeFile('src/app/favicon.ico', ico);
console.log('src/app/favicon.ico', `${(ico.length / 1024).toFixed(1)} KB`);

await mkdir('public/og', { recursive: true });
for (const locale of ['en', 'pt']) {
  const messages = JSON.parse(await readFile(`src/messages/${locale}.json`, 'utf8'));
  const png = await shoot(
    ogHtml({ title: messages.hero.title, tagline: messages.hero.tagline }),
    1200,
    630,
  );
  await writeFile(`public/og/${locale}.png`, png);
  console.log(`public/og/${locale}.png`, `${(png.length / 1024).toFixed(1)} KB`);
}

await browser.close();
