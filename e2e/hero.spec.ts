import { expect, test } from '@playwright/test';
import en from '../src/messages/en.json';

test('the headline has one stable accessible name', async ({ page }) => {
  await page.goto('/en');
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(en.site.hero.headlineSummary);
});

// Regression: text painted at opacity 0 does not count as the Largest Contentful Paint.
test('the headline and summary are visible on the first frame', async ({ page }) => {
  await page.goto('/en');
  const opacities = await page.evaluate(() => {
    for (const animation of document.getAnimations()) {
      animation.pause();
      animation.currentTime = 0;
    }
    return ['#home h1', '#home h1 + p'].map((selector) => getComputedStyle(document.querySelector(selector)!).opacity);
  });
  expect(opacities).toEqual(['1', '1']);
});

for (const width of [390, 1440]) {
  test(`typing never moves a word to another line or resizes the headline (${width}px)`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.clock.install();
    await page.goto('/pt');

    // For each phrase, the line of every word start; it must not change while the phrase is typed.
    const layouts = new Map<string, Set<string>>();
    const heights = new Set<number>();
    for (let step = 0; step < 400; step++) {
      await page.clock.runFor(40);
      const sample = await page.evaluate(() => {
        const grid = document.querySelector('#home h1 .grid')!;
        const visible = grid.lastElementChild!;
        const nodes: Text[] = [];
        const walker = document.createTreeWalker(visible, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) nodes.push(walker.currentNode as Text);
        const phrase = nodes.map((node) => node.data).join('');
        const top = grid.getBoundingClientRect().top;
        const lines: number[] = [];
        let offset = 0;
        for (const node of nodes) {
          for (let i = 0; i < node.data.length; i++) {
            if (offset + i > 0 && phrase[offset + i - 1] !== ' ') continue;
            const range = document.createRange();
            range.setStart(node, i);
            range.setEnd(node, i + 1);
            lines.push(Math.round(range.getBoundingClientRect().top - top));
          }
          offset += node.data.length;
        }
        return { phrase, layout: lines.join(','), height: Math.round(grid.getBoundingClientRect().height) };
      });
      if (!layouts.has(sample.phrase)) layouts.set(sample.phrase, new Set());
      layouts.get(sample.phrase)!.add(sample.layout);
      heights.add(sample.height);
    }

    expect(layouts.size, 'phrases typed').toBeGreaterThan(1);
    for (const [phrase, seen] of layouts) expect(seen.size, phrase).toBe(1);
    expect(heights.size).toBe(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
