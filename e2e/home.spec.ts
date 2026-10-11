import { expect, test } from './fixtures';

test.describe('home page', () => {
  test('the hero mounts the 3D scene on a wide screen', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('#home canvas')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Cleyton');
  });

  test('the menu highlights one section after scrolling', async ({ page }) => {
    await page.goto('/en');
    await page.locator('#experience').scrollIntoViewIfNeeded();
    const nav = page.getByRole('navigation', { name: 'Main' });
    await expect(nav.getByRole('link', { name: 'Experience' })).toHaveClass(/text-foreground/);
  });

  test('the contact form validates and confirms a sent message', async ({ page }) => {
    await page.route('https://api.web3forms.com/submit', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) }),
    );
    await page.goto('/en');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    const submit = page.getByRole('button', { name: 'Send Message' });
    await submit.click();
    await expect(page.locator('#contact p.text-destructive')).toHaveCount(3);

    await page.locator('#name').fill('Test Visitor');
    await page.locator('#email').fill('visitor@example.com');
    await page.locator('#message').fill('A message with more than ten characters.');
    await submit.click();
    await expect(page.getByRole('status')).toContainText('Message sent');
    // The parcel scene plays and leaves; the text confirmation stays.
    await expect(page.locator('[role=status] canvas')).toHaveCount(0, { timeout: 10_000 });
    await expect(page.getByRole('status')).toContainText('Message sent');
  });

  test.describe('with reduced motion', () => {
    test.use({ contextOptions: { reducedMotion: 'reduce' } });

    test('serves the static version without 3D', async ({ page }) => {
      await page.goto('/en');
      await page.waitForTimeout(1500);
      await expect(page.locator('canvas')).toHaveCount(0);
      await expect(page.locator('#home [role=img] img').first()).toBeVisible();
    });
  });

  test('works on a phone without the 3D scene @mobile', async ({ page }) => {
    await page.goto('/pt');
    await page.waitForTimeout(1500);
    await expect(page.locator('canvas')).toHaveCount(0);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Cleyton');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, 'horizontal overflow in px').toBeLessThanOrEqual(0);
  });
});
