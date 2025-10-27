"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutCompletePage = void 0;
/**
 * Page Object for the final "Checkout Complete" screen.
 * Provides helpers to read the confirmation text and navigate back home.
 */
class CheckoutCompletePage {
    // Strongly-typed references to page and locators
    page;
    header;
    backHome;
    /**
     * Constructor receives the Playwright Page and initializes stable locators.
     */
    constructor(page) {
        this.page = page; // active browser tab
        this.header = page.locator('.complete-header'); // "Thank you for your order!" header
        this.backHome = page.getByRole('button', { name: 'Back Home' }); // Back Home button
    }
    /**
     * Waits until the confirmation header is visible on the page.
     * Useful to ensure the page has fully transitioned to the completion state.
     */
    async waitForHeader() {
        await this.header.waitFor({ state: 'visible' });
    }
    /**
     * Reads and returns the header text (or null if not present yet).
     * This is handy for making assertions in tests.
     */
    async getHeaderText() {
        return await this.header.textContent();
    }
    /**
     * Clicks "Back Home" and waits until we're back on the inventory page.
     */
    async goHome() {
        await this.backHome.click();
        await this.page.waitForURL(/.*inventory\.html/);
    }
}
exports.CheckoutCompletePage = CheckoutCompletePage;
