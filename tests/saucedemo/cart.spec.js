// Import the extended test function (with fixtures) and the expect assertion
const { test, expect } = require("../../fixtures/test-fixtures");
const { name } = require("../../playwright.config");

test.describe("cart tests", () => {
  test.beforeEach(async ({ loginPage, inventory }) => {
    await loginPage.openLoginPage();
    await loginPage.login();
    await inventory.assertLoaded();
  });

  test("cart reflects multiple added products", async ({
    inventory,
    cartPage,
  }) => {
    const products = ["Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt"];
    for (const product of products) {
      await inventory.addToCartByName(product);
    }
    await inventory.openCart();
    for (const product of products) {
      await cartPage.assertContains(product);
    }
  });
});
