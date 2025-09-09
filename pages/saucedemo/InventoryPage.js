class InventoryPage {
    constructor(page) {
      this.page = page;
      this.items = page.locator('.inventory_item');
      this.sort = page.locator('.product_sort_container');
      this.cartLink = page.locator('.shopping_cart_link');
      this.badge = page.locator('.shopping_cart_badge');
      this.itemNameSel = '.inventory_item_name';
    }
  
    async assertLoaded() {
      await this.page.waitForURL(/.*inventory\.html/);
      await this.items.first().waitFor({ state: 'visible' }); // <- fix
      // alternativ: await expect(this.items.first()).toBeVisible();
    }
  
    async addToCartByName(name) {
      const item = this.items.filter({ has: this.page.getByText(name) });
      await item.getByRole('button', { name: 'Add to cart' }).click();
    }
  
    async openCart() {
      await this.cartLink.click();
    }
  
    async listItemNames() {
      return await this.page.locator(this.itemNameSel).allTextContents();
    }
  }
  
  module.exports = { InventoryPage };