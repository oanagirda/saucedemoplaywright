import { Page, Locator } from '@playwright/test';

/**
 * Page Object representing the Checkout Overview page in SauceDemo.
 * This page displays order summary details (items, tax, total) before completing the order.
 */
export class CheckoutOverviewPage {
  // Strongly typed class properties
  readonly page: Page;
  readonly finishBtn: Locator;
  readonly summary: Locator;

  /**
   * Constructor initializes the locators for the Overview page.
   * Receives the Playwright Page object from the test context.
   */
  constructor(page: Page) {
    this.page = page; // Playwright's active browser tab
    this.finishBtn = page.getByRole('button', { name: 'Finish' }); // "Finish" button
    this.summary = page.locator('.summary_info'); // summary info box (price, tax, total)
  }

  /**
   * Clicks the "Finish" button to complete the order.
   * Example:
   *   await overview.finishOrder();
   */
  async finishOrder(): Promise<void> {
    await this.finishBtn.click();
  }
}