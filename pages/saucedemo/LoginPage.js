class LoginPage {
  // The constructor is called when creating a new instance of LoginPage
    constructor(page) {
      this.page = page; // store the Playwright "page" object (browser tab)
      this.username = page.getByPlaceholder('Username');
      this.password = page.getByPlaceholder('Password');
      this.loginBtn = page.getByRole('button', { name: 'Login' });
      this.error = page.locator("[data-test='error']");
    }
  
    // Navigate to the login page
    async goto() {
      await this.page.goto('/'); //// Go to the base URL defined in playwright.config.js
      await this.page.waitForLoadState('domcontentloaded'); //// Wait until the DOM has finished loading
    }
  
    //login with correct credentials
    async login(user = 'standard_user', pass = 'secret_sauce') {
      await this.username.fill(user);
      await this.password.fill(pass);
      await this.loginBtn.click();
    }
  }
  
// Export the LoginPage class so it can be imported in other files
// Example usage:
//   const { LoginPage } = require('../pages/saucedemo/LoginPage');
//   const loginPage = new LoginPage(page);
  module.exports = { LoginPage };