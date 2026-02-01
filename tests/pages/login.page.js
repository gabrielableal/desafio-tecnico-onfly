// Page Object para a página do login
const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = "#user-name";
    this.passwordInput = "#password";
    this.loginButton = "#login-button";
    this.errorMessage = '[data-test="error"]';
  }

  async navigate() {
    await this.page.goto("https://www.saucedemo.com/", {
      waitUntil: "networkidle"
    });
    await expect(this.page.locator(this.loginButton)).toBeVisible();
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    const error = this.page.locator(this.errorMessage);
    await expect(error).toBeVisible();
    return await error.textContent();
  }
}

module.exports = LoginPage;