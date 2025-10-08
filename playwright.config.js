// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    //launchOptions: {
      //slowMo: 1500,     // slows down every action with 1500 ms
    //},
    viewport: { width: 1280, height: 800 },
  },
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
});