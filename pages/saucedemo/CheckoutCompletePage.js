class CheckoutCompletePage {
    constructor(page) {
      this.page = page; // store the Playwright page instance (browser tab)
      // Locator for the confirmation header ("Thank you for your order!")
      this.header = page.locator('.complete-header');
      this.backHome = page.getByRole('button', { name: 'Back Home' });
    }
  
    //Wait for the completed-header to be visible
    async waitForHeader() {
      await this.header.waitFor({ state: 'visible' });
    }

    //Returns the header text to be verified in the test
    async getHeaderText() {
      return await this.header.textContent(); 
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