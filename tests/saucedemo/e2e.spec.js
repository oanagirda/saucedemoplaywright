// Import the extended test (with fixtures) and expect assertion
const { test, expect } = require('../../fixtures/test-fixtures');

// Define a test suite for the end-to-end Checkout flow
test.describe('Checkout E2E', () => {
  // Define a single test: buy a product from login to order completion
  test('buy a product e2e', async ({
    page, loginPage, inventory, cartPage, checkout, overview, complete
  }) => {
    const productName = 'Sauce Labs Bike Light'; // The product that will be bought in this test

    //Go to login page and log in with default credentials
    await loginPage.goto();
    await loginPage.login();
    //verify that inventory page is loaded
    await inventory.assertLoaded();

    // Debugging: print all product names in the console
    console.log(await inventory.listItemNames()); // debug 

    await inventory.addToCartByName(productName);
    // Verify the cart badge shows "1" item
    await expect(inventory.badge).toHaveText('1');

    //Open the cart and verify the product is inside
    await inventory.openCart();
    await cartPage.assertContains(productName);
    await cartPage.checkout();

    //Fill in checkout form with sample data
    await checkout.fillInfo({ first: 'Testy', last: 'Test', zip: '122344' });

    await overview.finishOrder();

    //Verify the order was completed and go back to home
    await complete.assertCompleted();
    await complete.goHome();
  });
});