// Page Object para a página do produto
const { expect } = require("@playwright/test");

class ProductsPage {
  constructor(page) {
    this.page = page;

    this.productTitle = ".inventory_item_name";
    this.addToCartButton = "button[data-test^='add-to-cart']";
    this.cartIcon = ".shopping_cart_link";
  }

  async isLoaded() {
    await this.page.waitForURL(/inventory.html/);
    await expect(this.page.locator(this.productTitle).first()).toBeVisible();
  }

  async addFirstProductToCart() {
    await this.page.locator(this.addToCartButton).first().click();
  }

  async openCart() {
    await this.page.click(this.cartIcon);
  }
}

module.exports = ProductsPage;
