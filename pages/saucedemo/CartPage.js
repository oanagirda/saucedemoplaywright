class CartPage {
    constructor(page) {
      this.page = page; // store the Playwright page instance (browser tab)
      // Locator for all cart item containers (each product row inside the cart)
      this.items = page.locator('.cart_item');
      this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
    }
  
    // Verify that a given product name exists in the cart
    async assertContains(name) {
      await this.page
        // Find all product names inside cart items
        .locator('.cart_item .inventory_item_name')
        // Filter to only the item that contains the provided name
        .filter({ hasText: name })
        .waitFor({ state: 'visible' });
    }
  
    // Click the Checkout button to proceed to the checkout page
    async checkout() {
      await this.checkoutBtn.click();
    }
  }
  
  // Export the CartPage class so it can be imported in fixtures/tests
  module.exports = { CartPage };