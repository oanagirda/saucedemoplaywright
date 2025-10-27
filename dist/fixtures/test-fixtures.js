"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = exports.test = void 0;
// Import the base Playwright test and expect functions
const test_1 = require("@playwright/test");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return test_1.expect; } });
// Import all Page Object classes from the project
// These represent each page of the application and include typed methods & locators
const LoginPage_1 = require("../pages/saucedemo/LoginPage");
const InventoryPage_1 = require("../pages/saucedemo/InventoryPage");
const CartPage_1 = require("../pages/saucedemo/CartPage");
const CheckoutPage_1 = require("../pages/saucedemo/CheckoutPage");
const CheckoutOverviewPage_1 = require("../pages/saucedemo/CheckoutOverviewPage");
const CheckoutCompletePage_1 = require("../pages/saucedemo/CheckoutCompletePage");
// Extend Playwright's base test object with the custom fixtures
// Each fixture creates an instance of a page class and makes it available inside tests
exports.test = test_1.test.extend({
    login: async ({ page }, use) => { await use(new LoginPage_1.LoginPage(page)); },
    inventory: async ({ page }, use) => { await use(new InventoryPage_1.InventoryPage(page)); },
    cart: async ({ page }, use) => { await use(new CartPage_1.CartPage(page)); },
    checkout: async ({ page }, use) => { await use(new CheckoutPage_1.CheckoutPage(page)); },
    overview: async ({ page }, use) => { await use(new CheckoutOverviewPage_1.CheckoutOverviewPage(page)); },
    complete: async ({ page }, use) => { await use(new CheckoutCompletePage_1.CheckoutCompletePage(page)); },
});
