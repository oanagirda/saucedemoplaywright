class CheckoutCompletePage {
    constructor(page) {
      this.page = page;
      this.header = page.locator('.complete-header');
      this.backHome = page.getByRole('button', { name: 'Back Home' });
    }
  
    async assertCompleted() {
      await this.header.waitFor({ state: 'visible' });
      await expect(this.header).toHaveText('Thank you for your order!');
    }
  
    async goHome() {
      await this.backHome.click();
      await this.page.waitForURL(/.*inventory\.html/);
    }
  }
  
  const { expect } = require('@playwright/test');
  module.exports = { CheckoutCompletePage };