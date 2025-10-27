"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartPage = void 0;
/**
 * Page Object representing the Shopping Cart page of SauceDemo.
 * Contains locators and actions for verifying cart contents and navigating to checkout.
 */
class CartPage {
    // Define all typed properties
    page;
    items;
    checkoutBtn;
    /**
     * The constructor initializes locators for elements used on the Cart page.
     * It receives the Playwright Page object from the test context.
     */
    constructor(page) {
        this.page = page; // the active browser tab
        this.items = page.locator('.cart_item'); // each row/product in the cart
        this.checkoutBtn = page.getByRole('button', { name: 'Checkout' }); // "Checkout" button
    }
    /**
     * Asserts that a specific product name exists in the cart.
     * Example usage: await cart.assertContains('Sauce Labs Backpack');
     */
    async assertContains(name) {
        await this.page
            .locator('.cart_item .inventory_item_name') // locate all product names in cart
            .filter({ hasText: name }) // filter by given product name
            .waitFor({ state: 'visible' }); // wait until that element is visible
    }
    /**
     * Clicks the Checkout button to proceed to the next page.
     */
    async checkout() {
        await this.checkoutBtn.click();
    }
}
exports.CartPage = CartPage;
