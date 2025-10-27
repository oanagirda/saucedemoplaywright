"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// playwright.config.ts
const test_1 = require("@playwright/test");
exports.default = (0, test_1.defineConfig)({
    testDir: './tests',
    timeout: 30_000,
    expect: { timeout: 5_000 },
    use: {
        baseURL: 'https://www.saucedemo.com',
        headless: true, // CI-friendly
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
        { name: 'setup', testMatch: /auth\.setup\.spec\.ts/ },
        // Chromium tests — re-use login state
        {
            name: 'chromium',
            use: { ...test_1.devices['Desktop Chrome'], storageState: 'storage/standard_user.json' },
            dependencies: ['setup'],
        },
        // WebKit tests — re-use login state
        {
            name: 'webkit',
            use: { ...test_1.devices['Desktop Safari'], storageState: 'storage/standard_user.json' },
            dependencies: ['setup'],
        },
        // // Local demo headed + slowMo (optional, pentru prezentări)
        // {
        //   name: 'demo',
        //   use: { ...devices['Desktop Chrome'], headless: false, launchOptions: { slowMo: 400 }, storageState: 'storage/standard_user.json' },
        //   dependencies: ['setup'],
        // },
    ],
});
