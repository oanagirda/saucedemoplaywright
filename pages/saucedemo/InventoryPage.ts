import { Page, Locator } from '@playwright/test';

/**
 * Page Object representing the inventory (products) page of SauceDemo.
 * Contains locators and reusable actions related to product list and cart.
 */
export class InventoryPage {
  // Define typed properties for Playwright objects and selectors
  readonly page: Page;
  readonly items: Locator;
  readonly sort: Locator;
  readonly cartLink: Locator;
  readonly badge: Locator;
  readonly itemNameSel: string;

  /**
   * The constructor runs once when creating a new InventoryPage instance.
   * It receives the Playwright "page" object and defines all reusable locators.
   */
  constructor(page: Page) {
    this.page = page; // the browser tab instance
    this.items = page.locator('.inventory_item'); // all product cards
    this.sort = page.locator('.product_sort_container'); // dropdown for sorting
    this.cartLink = page.locator('.shopping_cart_link'); // cart icon top-right
    this.badge = page.locator('.shopping_cart_badge'); // small red badge with count
    this.itemNameSel = '.inventory_item_name'; // selector for each product name
  }

  /**
   * Verifies that the Inventory page has finished loading and is visible.
   */
  async assertLoaded(): Promise<void> {
    // Wait until the URL contains "inventory.html"
    await this.page.waitForURL(/.*inventory\.html/);
    // Wait until at least one product card is visible
    await this.items.first().waitFor({ state: 'visible' });
  }

  /**
   * Adds a product to the cart using its visible name.
   * Example: await inventory.addToCartByName('Sauce Labs Backpack');
   */
  async addToCartByName(name: string): Promise<void> {
    // Filter the product list to find the matching name
    const item = this.items.filter({ has: this.page.getByText(name) });
    // Within that item, locate the "Add to cart" button and click it
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  /**
   * Navigates to the shopping cart page by clicking the cart icon.
   */
  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  /**
   * Returns an array with the visible names of all listed products.
   */
  async listItemNames(): Promise<string[]> {
    return await this.page.locator(this.itemNameSel).allTextContents();
  }
}