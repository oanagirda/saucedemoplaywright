import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Generates a logged-in storageState for the SauceDemo `standard_user`.
 * Output: storage/standard_user.json
 * 
 * Tip: Configure this file ca „setup project” în playwright.config.ts, apoi
 *       setează `dependencies: ['setup']` pentru proiectele care-l folosesc.
 */
test('create storage state for standard_user', async ({ page }) => {
  // 1) Navigate using baseURL (set in playwright.config)
  await page.goto('/');

  // 2) Fill credentials
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // 3) Login
  await page.getByRole('button', { name: 'Login' }).click();

  // 4) Ensure we are on inventory page (successful login)
  await page.waitForURL(/inventory\.html/);

  // 5) Ensure storage dir exists
  const storageDir = path.join(__dirname, '../../storage');
  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
  }

  // 6) Persist authenticated state to JSON (cookies, localStorage, etc.)
  await page.context().storageState({
    path: path.join(storageDir, 'standard_user.json'),
  });
});