import { defineConfig, devices } from '@playwright/test';

const port = 3100;

/**
 * Smoke tests run against the production build (`npm run build` first).
 * Set E2E_BASE_URL to test an already running server instead.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: process.env.E2E_BASE_URL ?? `http://127.0.0.1:${port}`,
    trace: 'retain-on-failure',
    // Software WebGL, so the 3D scenes also mount on machines without a GPU.
    launchOptions: {
      args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
    },
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
      grepInvert: /@mobile/,
    },
    { name: 'mobile', use: { ...devices['Pixel 7'] }, grep: /@mobile/ },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `npm run start -- --port ${port} --hostname 127.0.0.1`,
        url: `http://127.0.0.1:${port}/en`,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});
