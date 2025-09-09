const { test, expect } = require('../../fixtures/test-fixtures');

test.describe('Login', () => {
  test('using incorrect credentials', async ({ page, loginPage }) => {
    await loginPage.goto();
    await expect(page).toHaveTitle('Swag Labs');

    await loginPage.login('wrong', 'creds');
    await expect(loginPage.error).toContainText(
      'do not match any user'
    );
  });

  test('successful login', async ({ page, loginPage, inventory }) => {
    await loginPage.goto();
    await loginPage.login();
    await inventory.assertLoaded();
  });
});