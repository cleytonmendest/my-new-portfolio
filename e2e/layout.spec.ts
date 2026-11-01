import { expect, test, type Page } from '@playwright/test';
import en from '../src/messages/en.json';

const hasHorizontalScroll = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);

test.describe('small phones', () => {
  test.use({ viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true });

  for (const path of ['/en', '/pt', '/en/experience', '/pt/projects/ultrafeu', '/en/education']) {
    test(`no horizontal scroll on ${path}`, async ({ page }) => {
      await page.goto(path);
      expect(await hasHorizontalScroll(page)).toBe(false);
    });
  }

  // Regression: on phones the three experience steps wrapped onto two lines.
  test('the experience steps fit on one line', async ({ page }) => {
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 640 });
      await page.goto('/pt');
      const tops = await page.locator('#experience [role="tab"]').evaluateAll((tabs) =>
        tabs.map((tab) => Math.round(tab.getBoundingClientRect().top))
      );
      expect(new Set(tops).size, `${width}px`).toBe(1);
    }

    // Wider screens keep the year, separated from the company by a space.
    await page.setViewportSize({ width: 1024, height: 640 });
    await expect(page.locator('#experience [role="tab"]').first()).toHaveText(/^\[\d{4} \S/, { useInnerText: true });
  });
});

test('the skip link is the first stop and moves focus to the content', async ({ page }) => {
  await page.goto('/en');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: en.site.header.skipToContent });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeInViewport();

  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  const focusedInContent = await page.evaluate(() => !!document.activeElement?.closest('#content'));
  expect(focusedInContent).toBe(true);
});

test('the header stays on top and anchors land below it', async ({ page }) => {
  await page.goto('/en/projects/ultrafeu');
  const nav = page.getByRole('navigation', { name: en.site.header.navLabel });
  await nav.getByRole('link', { name: en.site.header.nav.projects }).click();
  await page.waitForURL('**/en#projects');

  const header = page.locator('header');
  // Smooth scrolling: wait until the section has settled below the header.
  await expect(async () => {
    const headerBox = await header.boundingBox();
    const sectionTop = await page.locator('#projects').evaluate((el) => el.getBoundingClientRect().top);
    expect(headerBox?.y).toBe(0);
    expect(sectionTop).toBeGreaterThanOrEqual(headerBox!.height);
    expect(sectionTop).toBeLessThan(headerBox!.height + 80);
  }).toPass();
});
