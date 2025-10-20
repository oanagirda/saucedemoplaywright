// Import the extended test (with fixtures) and expect assertion
const { test, expect } = require("../../fixtures/test-fixtures");

// Define a test suite for the end-to-end Checkout flow
test.describe("Checkout E2E", () => {

  test.beforeEach(async ({login, inventory}) => {
    //Go to login page and log in with default credentials
    await login.openLoginPage();
    await login.login();
  })

  // Define a single test: buy a product from login to order completion
  test("buy a product e2e", async ({
    page,
    inventory,
    cart,
    checkout,
    overview,
    complete,
  }) => {
    const productName = "Sauce Labs Bike Light"; // The product that will be bought in this test
    //verify that inventory page is loaded
    await inventory.assertLoaded();
    await expect(inventory.items.first()).toBeVisible();

    // Debugging: print all product names in the console
    console.log(await inventory.listItemNames()); // debug

    await inventory.addToCartByName(productName);
    // Verify the cart badge shows "1" item
    await expect(inventory.badge).toHaveText("1");

    //Open the cart and verify the product is inside
    await inventory.openCart();
    await cart.assertContains(productName);
    await cart.checkout();

    //Fill in checkout form with sample data
    await checkout.fillInfo({ first: "Testy", last: "Test", zip: "122344" });

    await overview.finishOrder();

    //Verify the order was completed and go back to home
    await complete.waitForHeader();
    await expect(await complete.getHeaderText()).toBe(
      "Thank you for your order!"
    );
    await complete.goHome();
  });

  test('checkout fields validation', async ({page, cart, inventory, checkout, overview}) => {
    const productName = "Sauce Labs Bike Light";
    await inventory.addToCartByName(productName);
    await inventory.openCart();
    await cart.checkout();
    await checkout.fillInfo({first: '', last: '', zip: ''});
    await expect(page.getByText('Error: First Name is required')).toBeVisible();
  })
});
