class CheckoutPage {
    constructor(page) {
      this.page = page; // store the Playwright page instance
      this.firstName = page.getByPlaceholder('First Name');
      this.lastName  = page.getByPlaceholder('Last Name');
      // Locator for the postal/zip code input field
      // Using regex to match both "Zip Code" and "Postal Code" (case-insensitive)
      this.postal    = page.getByPlaceholder(/Zip|Postal/i);
      this.continue  = page.getByRole('button', { name: 'Continue' });
    }
  
    // Fill in the checkout form fields with provided or default values
    async fillInfo({ first = 'Testy', last = 'Test', zip = '122344' } = {}) {
      await this.firstName.fill(first);
      await this.lastName.fill(last);
      await this.postal.fill(zip);
      await this.continue.click();
    }
  }
  
  // Export the CheckoutPage class so it can be used in tests/fixtures
  module.exports = { CheckoutPage };