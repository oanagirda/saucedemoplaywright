import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the final "Checkout Complete" screen.
 * Provides helpers to read the confirmation text and navigate back home.
 */
export class CheckoutCompletePage {
  // Strongly-typed references to page and locators
  readonly page: Page;
  readonly header: Locator;
  readonly backHome: Locator;

  /**
   * Constructor receives the Playwright Page and initializes stable locators.
   */
  constructor(page: Page) {
    this.page = page;                                      // active browser tab
    this.header = page.locator('.complete-header');        // "Thank you for your order!" header
    this.backHome = page.getByRole('button', { name: 'Back Home' }); // Back Home button
  }

  /**
   * Waits until the confirmation header is visible on the page.
   * Useful to ensure the page has fully transitioned to the completion state.
   */
  async waitForHeader(): Promise<void> {
    await this.header.waitFor({ state: 'visible' });
  }

  /**
   * Reads and returns the header text (or null if not present yet).
   * This is handy for making assertions in tests.
   */
  async getHeaderText(): Promise<string | null> {
    return await this.header.textContent();
  }

  /**
   * Clicks "Back Home" and waits until we're back on the inventory page.
   */
  async goHome(): Promise<void> {
    await this.backHome.click();
    await this.page.waitForURL(/.*inventory\.html/);
  }
}