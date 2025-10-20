// Import the extended test function (with fixtures) and the expect assertion
const { test, expect } = require("../../fixtures/test-fixtures");
const { name } = require("../../playwright.config");

test.describe("cart tests", () => {
  test.beforeEach(async ({ login, inventory }) => {
    await login.openLoginPage();
    await login.login();
    await inventory.assertLoaded();
  });

  test("cart reflects multiple added products", async ({
    inventory,
    cart,
  }) => {
    const products = ["Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt"];
    for (const product of products) {
      await inventory.addToCartByName(product);
    }
    await inventory.openCart();
    for (const product of products) {
      await cart.assertContains(product);
    }
  });
});
