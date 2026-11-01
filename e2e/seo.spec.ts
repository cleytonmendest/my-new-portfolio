import { expect, test, type Page } from '@playwright/test';
import pt from '../src/messages/pt.json';

type JsonLd = { '@type': string; [key: string]: unknown };
type ListItem = { position: number; name: string; item: string };

async function readJsonLd(page: Page) {
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  return blocks.map((block) => JSON.parse(block) as JsonLd);
}

const ofType = (blocks: JsonLd[], type: string) => blocks.filter((block) => block['@type'] === type);

test('the home describes the person and the profile page in its language', async ({ page }) => {
  await page.goto('/pt');
  const data = await readJsonLd(page);

  expect(ofType(data, 'Person')[0].description).toBe(pt.site.meta.description);
  expect(ofType(data, 'WebSite')[0].inLanguage).toBe('pt-BR');
  expect(ofType(data, 'ProfilePage')).toHaveLength(1);
  expect(ofType(data, 'BreadcrumbList')).toHaveLength(0);
});

// Regression: the breadcrumb used to list #anchors of the home, which are not pages.
test('a case study has a breadcrumb of real pages', async ({ page, request }) => {
  await page.goto('/pt/projects/ultrafeu');
  const data = await readJsonLd(page);
  const items = ofType(data, 'BreadcrumbList')[0].itemListElement as ListItem[];

  expect(items.map((item) => item.name)).toEqual(['Cleyton Mendes', pt.site.projects.title, 'Ultrafeu']);
  expect(items.map((item) => new URL(item.item).pathname)).toEqual(['/pt', '/pt/projects', '/pt/projects/ultrafeu']);
  for (const item of items) {
    expect((await request.get(new URL(item.item).pathname)).status()).toBe(200);
  }
  expect(ofType(data, 'ProfilePage')).toHaveLength(0);
});

// Regression: inner pages inherited the home's og:title and og:url, and the share image was a cropped portrait.
test('pages have their own share title and a generated 1200x630 image', async ({ page, request }) => {
  for (const [path, title] of [
    ['/pt/experience', `${pt.site.experience.title} | Cleyton Mendes`],
    ['/pt/projects/ultrafeu', 'Ultrafeu | Cleyton Mendes'],
  ]) {
    await page.goto(path);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');

    const imageUrl = new URL((await page.locator('meta[property="og:image"]').getAttribute('content')) ?? '');
    const image = await request.get(imageUrl.pathname + imageUrl.search);
    expect(image.headers()['content-type']).toBe('image/png');
    const png = await image.body();
    // PNG header: width and height are the first two fields of the IHDR chunk.
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
  }
});

test('the sitemap lists every page in both locales, without fake dates', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);

  expect(urls).toEqual(expect.arrayContaining(['/en', '/pt', '/pt/experience', '/en/projects/ultrafeu']));
  expect(xml).not.toContain('<lastmod>');
  for (const path of urls) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
});
