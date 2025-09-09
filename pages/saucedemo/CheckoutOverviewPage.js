class CheckoutOverviewPage {
    constructor(page) {
      this.page = page;
      this.finish = page.getByRole('button', { name: 'Finish' });
      this.summary = page.locator('.summary_info');
    }
  
    async finishOrder() {
      await this.finish.click();
    }
  }
  
  module.exports = { CheckoutOverviewPage };