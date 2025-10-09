// Import the extended test function (with fixtures) and the expect assertion
const { test, expect } = require("../../fixtures/test-fixtures");
const { name } = require("../../playwright.config");

test.describe("inventory", () => {
  // Test case: Verify filtering products by "Price: low to high"
  test("filter Price low->high", async ({ page, loginPage, inventory }) => {
    await loginPage.openLoginPage();
    await loginPage.login();
    //Verify inventory page is loaded
    await inventory.assertLoaded();

    //Use the sorting dropdown to filter products by low price first
    await inventory.sort.selectOption("lohi");

    //Grab all product prices from the page as strings (e.g. "$9.99")
    const prices = await page
      .locator(".inventory_item_price")
      .allTextContents();
    //Convert price strings into numbers (remove "$" and turn into Number)
    const nums = prices.map((p) => Number(p.replace("$", "")));
    //Create a new sorted copy of the numbers (ascending order)
    const sorted = [...nums].sort((a, b) => a - b);
    //Verify that the prices on the page are already sorted correctly
    expect(nums).toEqual(sorted);
  });

  test('add/remove toggles button and badge', async ({loginPage, inventory}) => {
    await loginPage.openLoginPage();
    await loginPage.login();

    await inventory.assertLoaded();
    await inventory.addToCartByName('Sauce Labs Backpack');
    await expect(inventory.badge).toHaveText('1');
    const item = inventory.items.filter({hasText: 'Backpack'});
    await item.getByRole('button', {name: 'Remove'}).click();
    await expect(inventory.badge).toHaveCount(0); 
  })
});
