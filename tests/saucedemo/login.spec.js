// Import the extended test function (with fixtures) and the expect assertion
const { test, expect } = require('../../fixtures/test-fixtures');

// Define a test suite for login functionality
test.describe('Login', () => {
  // Test case: Login with incorrect username and password
  test('using incorrect credentials', async ({ page, loginPage }) => {
    await loginPage.openLoginPage();
    // Verify the page title is "Swag Labs"
    await expect(page).toHaveTitle('Swag Labs');

    await loginPage.login('wrong', 'creds');
    //Verify that an error message is displayed
    await expect(loginPage.error).toContainText('do not match any user');
  });

  // Test case: Login with correct username and password
  test('successful login', async ({ page, loginPage, inventory }) => {
    await loginPage.openLoginPage();
    await loginPage.login();
    //Verify that the inventory page is loaded successfully
    await inventory.assertLoaded();
  });

  test('verify error message for locked out user', async ({page, loginPage}) => {
    await loginPage.openLoginPage();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.error).toContainText('Epic sadface: Sorry, this user has been locked out.');
  })
});