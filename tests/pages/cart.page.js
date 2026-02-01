// Page Object para a página do carrinho
class CartPage {

  constructor(page) {
    this.page = page;

    this.cartItem = ".cart_item";
    this.checkoutButton = "#checkout";
  }

  async isProductVisible() {
    await this.page.waitForSelector(this.cartItem);
  }

  async clickCheckout() {
    await this.page.click(this.checkoutButton);
  }
}

module.exports = CartPage;
