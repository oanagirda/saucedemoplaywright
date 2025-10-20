// Import Playwright's test function
const { test } = require('@playwright/test');

// Import Node.js modules for file handling
const fs = require('fs');
const path = require('path');

// This test is used only to generate a logged-in storage state (cookie/session)
test('create storage state for standard_user', async ({ page }) => {

  // Step 1: Navigate to the login page of SauceDemo using the base URL
  await page.goto('https://www.saucedemo.com/');

  // Step 2: Fill in login credentials
  await page.getByPlaceholder('Username').fill('standard_user'); // Enter username
  await page.getByPlaceholder('Password').fill('secret_sauce');   // Enter password

  // Step 3: Click the Login button
  await page.getByRole('button', { name: 'Login' }).click();

  // Step 4: Wait until we are redirected to the inventory page (successful login)
  await page.waitForURL(/inventory\.html/);

  // Step 5: Ensure the 'storage' folder exists (create if it doesn't)
  const storageDir = path.join(__dirname, '../../storage');
  if (!fs.existsSync(storageDir)) fs.mkdirSync(storageDir, { recursive: true });

  // Step 6: Save the authenticated browser context (cookies, session, localStorage)
  // This creates the file: storage/standard_user.json
  await page.context().storageState({
    path: path.join(storageDir, 'standard_user.json')
  });
});