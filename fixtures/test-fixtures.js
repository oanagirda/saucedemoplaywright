const base = require('@playwright/test');
const { LoginPage } = require('../pages/saucedemo/LoginPage');
const { InventoryPage } = require('../pages/saucedemo/InventoryPage');
const { CartPage } = require('../pages/saucedemo/CartPage');
const { CheckoutPage } = require('../pages/saucedemo/CheckoutPage');
const { CheckoutOverviewPage } = require('../pages/saucedemo/CheckoutOverviewPage');
const { CheckoutCompletePage } = require('../pages/saucedemo/CheckoutCompletePage');

const test = base.test.extend({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  inventory: async ({ page }, use) => { await use(new InventoryPage(page)); },
  cartPage:  async ({ page }, use) => { await use(new CartPage(page)); },
  checkout:  async ({ page }, use) => { await use(new CheckoutPage(page)); },
  overview:  async ({ page }, use) => { await use(new CheckoutOverviewPage(page)); },
  complete:  async ({ page }, use) => { await use(new CheckoutCompletePage(page)); },
});

module.exports = { test, expect: base.expect };