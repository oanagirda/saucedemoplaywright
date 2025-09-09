class CartPage {
    constructor(page) {
      this.page = page;
      this.items = page.locator('.cart_item');
      this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
    }
  
    async assertContains(name) {
      await this.page
        .locator('.cart_item .inventory_item_name')
        .filter({ hasText: name })
        .waitFor({ state: 'visible' });
    }
  
    async checkout() {
      await this.checkoutBtn.click();
    }
  }
  
  module.exports = { CartPage };