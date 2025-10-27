// Import the base Playwright test and expect functions
import { test as base, expect } from '@playwright/test';

// Import all Page Object classes from the project
// These represent each page of the application and include typed methods & locators
import { LoginPage } from '../pages/saucedemo/LoginPage';
import { InventoryPage } from '../pages/saucedemo/InventoryPage';
import { CartPage } from '../pages/saucedemo/CartPage';
import { CheckoutPage } from '../pages/saucedemo/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/saucedemo/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/saucedemo/CheckoutCompletePage';

// Define a custom TypeScript "type" that describes all the custom fixtures
// This tells Playwright and the editor what objects are available in tests
type Fixtures = {
  login: LoginPage;
  inventory: InventoryPage;
  cart: CartPage;
  checkout: CheckoutPage;
  overview: CheckoutOverviewPage;
  complete: CheckoutCompletePage;
};

// Extend Playwright's base test object with the custom fixtures
// Each fixture creates an instance of a page class and makes it available inside tests
export const test = base.extend<Fixtures>({
  login: async ({ page }, use) => { await use(new LoginPage(page)); },
  inventory: async ({ page }, use) => { await use(new InventoryPage(page)); },
  cart: async ({ page }, use) => { await use(new CartPage(page)); },
  checkout: async ({ page }, use) => { await use(new CheckoutPage(page)); },
  overview: async ({ page }, use) => { await use(new CheckoutOverviewPage(page)); },
  complete: async ({ page }, use) => { await use(new CheckoutCompletePage(page)); },
});

// Export the "expect" function so the tests can import both:
// import { test, expect } from '../fixtures/test-fixtures';
export { expect };