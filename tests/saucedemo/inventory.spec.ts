import { expect } from '@playwright/test';
import { test } from '../../fixtures/test-fixtures'; // brings in typed fixtures: login, inventory, etc.

/**
 * Inventory test suite
 * Covers sorting by price and cart badge behavior when adding/removing items.
 */
test.describe('inventory', () => {
  /**
   * Verify sorting by "Price: low to high"
   * Ensures the page sorts prices ascending when selecting "lohi" in the dropdown.
   */
  test('filter Price low->high', async ({ page, login, inventory }) => {
    // Go to login and authenticate
    await login.openLoginPage();
    await login.login();

    // Ensure inventory is fully loaded
    await inventory.assertLoaded();

    // Select "low to high" from the sort dropdown
    await inventory.sort.selectOption('lohi');

    // Collect all visible prices (strings like "$9.99")
    const prices = await page.locator('.inventory_item_price').allTextContents();

    // Convert price strings to numbers (strip the "$" prefix)
    const nums = prices.map(p => Number(p.replace('$', '')));

    // Create an ascending-sorted copy for comparison
    const sorted = [...nums].sort((a, b) => a - b);

    // Assert that the page is already sorted ascending
    expect(nums).toEqual(sorted);
  });

  /**
   * Add/remove behavior
   * After adding one product, the cart badge should show "1".
   * After removing it, the badge element should disappear (count = 0).
   */
  test('add/remove toggles button and badge', async ({ login, inventory }) => {
    // Login and land on inventory
    await login.openLoginPage();
    await login.login();
    await inventory.assertLoaded();

    // Add a product to cart
    await inventory.addToCartByName('Sauce Labs Backpack');

    // Badge should show "1"
    await expect(inventory.badge).toHaveText('1');

    // Click the "Remove" button for the same product
    const item = inventory.items.filter({ hasText: 'Backpack' });
    await item.getByRole('button', { name: 'Remove' }).click();

    // When cart is empty, the badge element disappears → expect count 0
    await expect(inventory.badge).toHaveCount(0);
  });
});