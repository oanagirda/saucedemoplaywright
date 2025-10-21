// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },

  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,                 // CI-friendly
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 800 },
    // IMPORTANT: no 'storageState' here
  },

  reporter: [
    ['line'],
    ['junit', { outputFile: 'junit-results.xml' }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  projects: [
    // Setup project — creates storage/standard_user.json
    { name: 'setup', testMatch: /auth\.setup\.spec\.js/ },

    // Chromium tests — re-use login state
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: 'storage/standard_user.json' },
      dependencies: ['setup'],
    },

    // WebKit tests — re-use login state
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], storageState: 'storage/standard_user.json' },
      dependencies: ['setup'],
    },

    // local demo headed + slowMo
    // {
    //   name: 'demo',
    //   use: { ...devices['Desktop Chrome'], headless: false, launchOptions: { slowMo: 400 }, storageState: 'storage/standard_user.json' },
    //   dependencies: ['setup'],
    // },
  ],
});