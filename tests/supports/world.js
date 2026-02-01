// Configuração global do Cucumber com Playwright
const {
  setWorldConstructor,
  Before,
  After,
  setDefaultTimeout
} = require("@cucumber/cucumber");

const { chromium } = require("playwright");

setDefaultTimeout(30 * 1000); 

class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});