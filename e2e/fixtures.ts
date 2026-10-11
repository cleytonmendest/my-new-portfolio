import { expect, test as base } from '@playwright/test';

/**
 * Every test fails on console errors, uncaught exceptions and failed requests to our own
 * origin. Warnings are ignored on purpose (React Three Fiber logs a THREE.Clock deprecation).
 */
export const test = base.extend<{ problems: string[] }>({
  problems: [
    async ({ page, baseURL }, use) => {
      const problems: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error') problems.push(`console: ${message.text()}`);
      });
      page.on('pageerror', (error) => problems.push(`exception: ${error.message}`));
      page.on('response', (response) => {
        if (response.status() >= 400 && baseURL && response.url().startsWith(baseURL)) {
          problems.push(`${response.status()} ${response.url()}`);
        }
      });
      await use(problems);
      expect(problems, 'console errors and failed requests').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
