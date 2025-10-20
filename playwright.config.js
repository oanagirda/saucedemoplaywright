const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },

  // Reporters usable by Jenkins (JUnit) + HTML report
  reporter: [
    ['line'],
    ['junit', { outputFile: 'junit-results.xml' }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  // Settings applied to all projects unless overridden below
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,                 // CI-safe (no UI in Jenkins)
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 800 },
  },

  // Run these in parallel; 'setup' runs first to create storageState
  projects: [
    // 0) One-time auth setup (creates storage/standard_user.json)
    { name: 'setup', testMatch: /_auth\.setup\.spec\.js/ },

    // 1) Chromium on Desktop (uses saved login state)
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storage/standard_user.json',
      },
      dependencies: ['setup'],
    },

    // 2) WebKit / Safari on Desktop (also uses saved login state)
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: 'storage/standard_user.json',
      },
      dependencies: ['setup'],
    },

    // Optional local demo project (headed + slowMo)
    /*{
      name: 'demo',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        launchOptions: {
          slowMo: 400,               // smooth demo for the audience
        },
        storageState: 'storage/standard_user.json',
      },
      dependencies: ['setup'],
    },*/
  ],
});