import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the SauceDemo login page.
 * Encapsulates all locators and actions related to logging in.
 */
export class LoginPage {
  // Strongly-typed references to the Playwright page and page locators
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;
  readonly error: Locator;

  /**
   * The constructor receives a Playwright Page instance.
   * all frequently-used locators are cached and resolved here.
   */
  constructor(page: Page) {
    this.page = page;                             // store the browser tab
    this.username = page.getByPlaceholder('Username'); // user-facing locator
    this.password = page.getByPlaceholder('Password'); // user-facing locator
    this.loginBtn = page.getByRole('button', { name: 'Login' }); // role-based locator
    this.error = page.locator("[data-test='error']");  // data-test locator (stable for assertions)
  }

  /**
   * Navigates to the login page. Uses baseURL from playwright.config.ts
   * keeping the tests portable across environments.
   */
  async openLoginPage(): Promise<void> {
    await this.page.goto('/');                         // hits https://.../ thanks to baseURL
    await this.page.waitForLoadState('domcontentloaded'); // waits until DOM is interactive
  }

  /**
   * Performs the login action with provided credentials.
   * Defaults are SauceDemo's standard_user.
   */
  async login(user: string = 'standard_user', pass: string = 'secret_sauce'): Promise<void> {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  /**
   * Returns the visible error message (if any) after a failed login.
   * Helpful for negative tests.
   */
  async readError(): Promise<string | null> {
    // Check asynchronously if the error element is visible
    const isVisible = await this.error.isVisible();
  
    // If it is visible, return its text content; otherwise return null
    return isVisible ? await this.error.textContent() : null;
  }
}