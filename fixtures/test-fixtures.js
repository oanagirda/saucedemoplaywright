// Import Playwright's base test and expect
const base = require('@playwright/test');

// Import all Page Object classes that represent the different pages of the app
const { LoginPage } = require('../pages/saucedemo/LoginPage');
const { InventoryPage } = require('../pages/saucedemo/InventoryPage');
const { CartPage } = require('../pages/saucedemo/CartPage');
const { CheckoutPage } = require('../pages/saucedemo/CheckoutPage');
const { CheckoutOverviewPage } = require('../pages/saucedemo/CheckoutOverviewPage');
const { CheckoutCompletePage } = require('../pages/saucedemo/CheckoutCompletePage');

// Extend the base test function with custom fixtures
// Each fixture here will create and provide a Page Object instance
// so it can be used directly inside the tests as a parameter
const test = base.test.extend({
  // Define "loginPage" fixture:
  // - receives Playwright's "page" object
  // - instantiates the LoginPage class with it
  // - makes it available in the test via "use"
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  inventory: async ({ page }, use) => { await use(new InventoryPage(page)); },
  cartPage:  async ({ page }, use) => { await use(new CartPage(page)); },
  checkout:  async ({ page }, use) => { await use(new CheckoutPage(page)); },
  overview:  async ({ page }, use) => { await use(new CheckoutOverviewPage(page)); },
  complete:  async ({ page }, use) => { await use(new CheckoutCompletePage(page)); },
});

// Export the extended "test" (with fixtures) and the base "expect"
// So in the test files it can be used:  const { test, expect } = require('../../fixtures/test-fixtures');
module.exports = { test, expect: base.expect };