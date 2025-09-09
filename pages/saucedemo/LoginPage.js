class LoginPage {
    constructor(page) {
      this.page = page;
      this.username = page.getByPlaceholder('Username');
      this.password = page.getByPlaceholder('Password');
      this.loginBtn = page.getByRole('button', { name: 'Login' });
      this.error = page.locator("[data-test='error']");
    }
  
    async goto() {
      await this.page.goto('/');            // use baseURL from config
      await this.page.waitForLoadState('domcontentloaded');
    }
  
    async login(user = 'standard_user', pass = 'secret_sauce') {
      await this.username.fill(user);
      await this.password.fill(pass);
      await this.loginBtn.click();
    }
  }
  
  module.exports = { LoginPage };