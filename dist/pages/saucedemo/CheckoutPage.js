"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutPage = void 0;
/**
 * Page Object representing the first Checkout step in SauceDemo.
 * Handles entering user information and continuing to the next step.
 */
class CheckoutPage {
    // Define typed references to the page and locators
    page;
    firstName;
    lastName;
    postal;
    continueBtn;
    /**
     * The constructor initializes locators for all form fields and buttons.
     * It receives the Playwright Page instance from the test context.
     */
    constructor(page) {
        this.page = page; // store the Playwright page instance (browser tab)
        this.firstName = page.getByPlaceholder('First Name'); // first name input field
        this.lastName = page.getByPlaceholder('Last Name'); // last name input field
        // Use regex to support both "Zip Code" and "Postal Code" placeholders
        this.postal = page.getByPlaceholder(/Zip|Postal/i);
        this.continueBtn = page.getByRole('button', { name: 'Continue' }); // Continue button
    }
    /**
     * Fills out the checkout form and submits it.
     * Default values are provided for convenience.
     * Example:
     *   await checkout.fillInfo({ first: 'Oana', last: 'Girda', zip: '400000' });
     */
    async fillInfo({ first = 'Testy', last = 'Test', zip = '122344' } = {}) {
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.postal.fill(zip);
        await this.continueBtn.click();
    }
}
exports.CheckoutPage = CheckoutPage;
