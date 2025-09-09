const { test, expect } = require('../../fixtures/test-fixtures');

test.describe('Checkout E2E', () => {
  test('buy a product e2e', async ({
    page, loginPage, inventory, cartPage, checkout, overview, complete
  }) => {
    const productName = 'Sauce Labs Bike Light';

    await loginPage.goto();
    await loginPage.login();
    await inventory.assertLoaded();

    console.log(await inventory.listItemNames()); // debug 

    await inventory.addToCartByName(productName);
    await expect(inventory.badge).toHaveText('1');

    await inventory.openCart();
    await cartPage.assertContains(productName);
    await cartPage.checkout();

    await checkout.fillInfo({ first: 'Testy', last: 'Test', zip: '122344' });

    await overview.finishOrder();

    await complete.assertCompleted();
    await complete.goHome();
  });
});