class CheckoutCompletePage {
    constructor(page) {
      this.page = page; // store the Playwright page instance (browser tab)
      // Locator for the confirmation header ("Thank you for your order!")
      this.header = page.locator('.complete-header');
      this.backHome = page.getByRole('button', { name: 'Back Home' });
    }
  
    // Verify that the order has been completed successfully
    async assertCompleted() {
      await this.header.waitFor({ state: 'visible' });
      await expect(this.header).toHaveText('Thank you for your order!');
    }
  
    // Click "Back Home" to return to the inventory page
    async goHome() {
      await this.backHome.click();
      // Wait until the URL shows we're back on the inventory page
      await this.page.waitForURL(/.*inventory\.html/);
    }
  }
  
  // Import Playwright's "expect" assertion
  const { expect } = require('@playwright/test');
  // Export the CheckoutCompletePage class so it can be imported in fixtures/tests
  module.exports = { CheckoutCompletePage };