class CheckoutOverviewPage {
    constructor(page) {
      this.page = page; // store the Playwright page instance (browser tab)
      this.finish = page.getByRole('button', { name: 'Finish' });
      // Locator for the summary information box (shows price, tax, total, etc.)
      this.summary = page.locator('.summary_info');
    }
  
    // Click the Finish button to complete the order
    async finishOrder() {
      await this.finish.click();
    }
  }
  
  // Export the class so it can be imported in fixtures/tests
  module.exports = { CheckoutOverviewPage };