class InventoryPage {
    constructor(page) {
      this.page = page; // store the Playwright page instance (browser tab)
      this.items = page.locator('.inventory_item');
      this.sort = page.locator('.product_sort_container');
      this.cartLink = page.locator('.shopping_cart_link');
      this.badge = page.locator('.shopping_cart_badge');
      // A selector string for the product names (used in listItemNames)
      this.itemNameSel = '.inventory_item_name';
    }
  
    // Verify that the Inventory page has fully loaded
    async assertLoaded() {
      // Wait until the URL matches ".../inventory.html" - using RegEx not the exact string
      await this.page.waitForURL(/.*inventory\.html/);
      // Wait until at least the first product item is visible
      await expect(this.items.first()).toBeVisible();
    }
  
    // Add a product to the cart by its name
    async addToCartByName(name) {
      // Filter the list of items to the one containing the given product name
      const item = this.items.filter({ has: this.page.getByText(name) });
      // Inside that item, find the "Add to cart" button and click it
      await item.getByRole('button', { name: 'Add to cart' }).click();
    }
  
    // Click on the cart link to navigate to the cart page
    async openCart() {
      await this.cartLink.click();
    }
  
    // Return an array with the text of all product names
    async listItemNames() {
      return await this.page.locator(this.itemNameSel).allTextContents();
    }
  }
  
  // Export the InventoryPage class so it can be imported in fixtures/tests
  module.exports = { InventoryPage };