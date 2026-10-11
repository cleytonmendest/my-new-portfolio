import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures';

const pages = ['/en', '/pt', '/tools', '/design-system'];
const themes = ['light', 'dark'] as const;

for (const path of pages) {
  for (const theme of themes) {
    test(`${path} has no axe violations in the ${theme} theme`, async ({ page }) => {
      await page.addInitScript((value) => localStorage.setItem('theme', value), theme);
      await page.goto(path);
      // Let the lazy sections and the 3D scene mount before scanning.
      await page.waitForTimeout(1500);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(
        results.violations.map((violation) => ({
          id: violation.id,
          nodes: violation.nodes.map((node) => node.target.join(' ')),
        })),
      ).toEqual([]);
    });
  }
}
