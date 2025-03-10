import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from '@utilities/constants';
import { CI } from '@utilities/environment';

export default defineConfig({
  outputDir: 'playwright/reports',
  timeout: 60000, // One minute
  expect: {
    timeout: 10000, // Ten seconds
  },
  testDir: './src/e2e/tests',
  fullyParallel: false, //false because it doesn't make sense. We only have 1 scenario
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  workers: CI ? 4 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright/reports', open: CI ? 'never' : 'always' }],
    ['json', { outputFile: 'playwright/reports/results.json' }],
  ],
  use: {
    baseURL: BASE_URL,
    launchOptions: { 
      slowMo: 0, 
      headless: false 
    },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'], 
        channel: 'chrome', 
      },
      testMatch: '**/CartFlow/**',
    },
  ],
});
