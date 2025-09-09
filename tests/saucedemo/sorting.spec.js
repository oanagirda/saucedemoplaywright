const { test, expect } = require('../../fixtures/test-fixtures');

test('filter Price low->high', async ({ page, loginPage, inventory }) => {
  await loginPage.goto();
  await loginPage.login();
  await inventory.assertLoaded();

  await inventory.sort.selectOption('lohi');

  const prices = await page.locator('.inventory_item_price').allTextContents();
  const nums = prices.map(p => Number(p.replace('$', '')));
  const sorted = [...nums].sort((a, b) => a - b);
  expect(nums).toEqual(sorted);
});