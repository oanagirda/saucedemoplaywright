class CheckoutPage {
    constructor(page) {
      this.page = page;
      this.firstName = page.getByPlaceholder('First Name');
      this.lastName  = page.getByPlaceholder('Last Name');
      this.postal    = page.getByPlaceholder(/Zip|Postal/i);
      this.continue  = page.getByRole('button', { name: 'Continue' });
    }
  
    async fillInfo({ first = 'Testy', last = 'Test', zip = '122344' } = {}) {
      await this.firstName.fill(first);
      await this.lastName.fill(last);
      await this.postal.fill(zip);
      await this.continue.click();
    }
  }
  
  module.exports = { CheckoutPage };