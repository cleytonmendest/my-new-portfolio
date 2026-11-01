import { expect, test } from '@playwright/test';
import pt from '../src/messages/pt.json';

const PAGES = ['/en', '/pt', '/en/experience', '/pt/projects', '/en/projects/ultrafeu', '/pt/education'];

test('portfolio pages respond in both locales', async ({ request }) => {
  for (const path of PAGES) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
});

test('the root redirects to a locale', async ({ request }) => {
  const response = await request.get('/', { maxRedirects: 0 });
  expect(response.status()).toBe(307);
  expect(response.headers().location).toMatch(/^\/(en|pt)$/);
});

// Regression: a missing file used to match the [locale] segment and fail with a 500.
test('missing files return 404, not 500', async ({ request }) => {
  for (const path of ['/apple-touch-icon.png', '/favicon-16x16.png', '/missing.txt']) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});

test('unknown pages show the localized 404', async ({ page }) => {
  const response = await page.goto('/pt/nao-existe');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(pt.site.notFound.title);
});

// The WhatsApp bot policy URLs are registered externally: they must keep working without a locale.
test('legacy pages stay at their URLs', async ({ request }) => {
  for (const path of ['/tools', '/whatsapp-bot/termos-de-uso', '/whatsapp-bot/politica-de-privacidade']) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
});
