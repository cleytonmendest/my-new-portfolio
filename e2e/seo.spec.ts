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
