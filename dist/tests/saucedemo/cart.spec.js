"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const test_fixtures_1 = require("../../fixtures/test-fixtures");
/**
 * Cart Tests
 * Focuses on verifying cart contents and multi-item behavior.
 */
test_fixtures_1.test.describe('cart tests', () => {
    /**
     * Runs before each test — logs in and loads inventory page.
     */
    test_fixtures_1.test.beforeEach(async ({ login, inventory }) => {
        await login.openLoginPage();
        await login.login();
        await inventory.assertLoaded();
    });
    /**
     * Verify that the cart correctly reflects multiple added products.
     */
    (0, test_fixtures_1.test)('cart reflects multiple added products', async ({ inventory, cart }) => {
        // Define a list of products to add
        const products = ['Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
        // Add each product to the cart one by one
        for (const product of products) {
            await inventory.addToCartByName(product);
        }
        // Open the cart page
        await inventory.openCart();
        // Verify each product appears inside the cart
        for (const product of products) {
            await cart.assertContains(product);
        }
        // Optional: verify total number of cart items matches expectation
        await (0, test_1.expect)(cart.items).toHaveCount(products.length);
    });
});
