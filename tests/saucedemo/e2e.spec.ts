import { expect } from '@playwright/test';
import { test } from '../../fixtures/test-fixtures';

/**
 * 🛒 End-to-end Checkout flow
 * Covers: login → add to cart → checkout → finish → back home
 */
test.describe('Checkout E2E', () => {
  /**
   * Runs before each test in this suite.
   * Logs in with default credentials and ensures we're on the inventory page.
   */
  test.beforeEach(async ({ login, inventory }) => {
    await login.openLoginPage();  // navigate to baseURL ('/')
    await login.login();          // default: standard_user / secret_sauce
    await inventory.assertLoaded();
  });

  /**
   * Happy path: buy a product end-to-end
   */
  test('buy a product e2e', async ({ page, inventory, cart, checkout, overview, complete }) => {
    const productName = 'Sauce Labs Bike Light';

    // Ensure inventory is visible
    await expect(inventory.items.first()).toBeVisible();

    // (Optional) Debug: print all product names to console
    // Useful in CI logs for troubleshooting selectors
    console.log(await inventory.listItemNames());

    // Add selected product to cart and verify cart badge
    await inventory.addToCartByName(productName);
    await expect(inventory.badge).toHaveText('1');

    // Open cart, verify product is there, and proceed to checkout
    await inventory.openCart();
    await cart.assertContains(productName);
    await cart.checkout();

    // Fill checkout info and continue
    await checkout.fillInfo({ first: 'Testy', last: 'Test', zip: '122344' });

    // Complete the order
    await overview.finishOrder();

    // Verify completion screen and go back home
    await complete.waitForHeader();
    await expect(await complete.getHeaderText()).toBe('Thank you for your order!');
    await complete.goHome();

    // Optional: verify we returned to inventory page
    await inventory.assertLoaded();
  });

  /**
   * 🧪 Validation: empty fields should show required error
   */
  test('checkout fields validation', async ({ page, inventory, cart, checkout }) => {
    const productName = 'Sauce Labs Bike Light';

    // Add to cart and go through to checkout
    await inventory.addToCartByName(productName);
    await inventory.openCart();
    await cart.checkout();

    // Submit empty form → expect validation error
    await checkout.fillInfo({ first: '', last: '', zip: '' });

    // Assert the specific error message is visible
    await expect(page.getByText('Error: First Name is required')).toBeVisible();
  });
});