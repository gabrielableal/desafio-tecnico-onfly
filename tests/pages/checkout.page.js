// Page Object para a página de checkout
class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.firstNameInput = "#first-name";
    this.lastNameInput = "#last-name";
    this.zipCodeInput = "#postal-code";
    this.continueButton = "#continue";
    this.errorMessage = "[data-test='error']";
    this.summaryContainer = ".summary_info";
  }

  async fillCheckoutForm(firstName, lastName, zipCode) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.zipCodeInput, zipCode);
  }

  async continue() {
    await this.page.click(this.continueButton);
  }

  async isSummaryVisible() {
    await this.page.waitForSelector(this.summaryContainer);
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }
}

module.exports = CheckoutPage;
