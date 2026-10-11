import { expect, test } from './fixtures';

test.describe('routes', () => {
  for (const path of ['/en', '/pt', '/tools', '/tools/qrcode', '/tools/prompt-generator', '/whatsapp-bot/termos-de-uso', '/whatsapp-bot/politica-de-privacidade', '/design-system']) {
    test(`${path} responds 200`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('main')).toBeVisible();
    });
  }

  test('sitemap lists both languages with alternates', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const xml = await response.text();
    expect(xml).toContain('/en');
    expect(xml).toContain('/pt');
    expect(xml).toContain('hreflang="pt"');
  });

  test('unprefixed paths redirect to the visitor language', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'pt-BR' });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/pt$/);
    await context.close();
  });

  test('old pages redirect to a section of the home page', async ({ page }) => {
    await page.goto('/experience');
    await expect(page).toHaveURL(/\/en#experience$/);
  });

  test('unknown paths show the 404 page', async ({ page, problems }) => {
    const response = await page.goto('/en/does-not-exist');
    expect(response?.status()).toBe(404);
    await expect(page.locator('main')).toBeVisible();
    // The 404 itself is expected, so the failed request and its console line are not problems.
    problems.length = 0;
  });
});

test.describe('language and theme', () => {
  test('switching language keeps the current section', async ({ page }) => {
    await page.goto('/en#skills');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.getByRole('navigation', { name: 'Language' }).getByRole('link', { name: /pt/i }).click();
    await expect(page).toHaveURL(/\/pt#skills$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt');
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Projetos' })).toBeVisible();
  });

  test('theme toggle switches between light and dark', async ({ page }) => {
    await page.goto('/en');
    const html = page.locator('html');
    const toggle = page.getByRole('button', { name: /^Theme:/ });
    const before = await html.evaluate((element) => element.classList.contains('dark'));
    await toggle.click();
    await expect.poll(() => html.evaluate((element) => element.classList.contains('dark'))).toBe(!before);
    await toggle.click();
    await expect.poll(() => html.evaluate((element) => element.classList.contains('dark'))).toBe(before);
  });
});
