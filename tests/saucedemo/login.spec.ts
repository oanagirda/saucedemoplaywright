import { expect } from '@playwright/test';
import { test } from '../../fixtures/test-fixtures';

/**
 * 🔐 Login test suite
 * Contains both positive and negative login scenarios for SauceDemo.
 */
test.describe('Login', () => {
  /**
   * Negative test — invalid username and password
   * Verifies that an error message is displayed for invalid credentials.
   */
  test('using incorrect credentials', async ({ page, login }) => {
    // Navigate to login page
    await login.openLoginPage();

    // Verify the page title
    await expect(page).toHaveTitle('Swag Labs');

    // Try logging in with incorrect credentials
    await login.login('wrong', 'creds');

    // Verify error message is displayed
    await expect(login.error).toContainText('do not match any user');
  });

  /**
   * ✅ Positive test — correct login credentials
   * Verifies that the inventory page loads successfully after login.
   */
  test('successful login', async ({ page, login, inventory }) => {
    await login.openLoginPage();
    await login.login();
    await inventory.assertLoaded(); // Confirm inventory page loaded
  });

  /**
   * Locked-out user test
   * Ensures the correct error message appears for a locked-out user.
   */
  test('verify error message for locked out user', async ({ page, login }) => {
    await login.openLoginPage();
    await login.login('locked_out_user', 'secret_sauce');
    await expect(login.error).toContainText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
});