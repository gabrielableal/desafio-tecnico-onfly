// Steps do Cucumber
const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

const LoginPage = require("../pages/login.page");
const ProductsPage = require("../pages/products.page");
const CartPage = require("../pages/cart.page");
const CheckoutPage = require("../pages/checkout.page");

// ---------- Login ----------
Given("que o usuário esteja na página de login", async function () {
  // Inicializa a página e verifica se o botão de login está visível
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
  await expect(this.page.locator("#login-button")).toBeVisible();
});

When("informa um usuário válido", async function () {
  //Usuário válido para login
  this.username = "standard_user";
});

When("informa uma senha válida", async function () {
  // Senha válida para login
  this.password = "secret_sauce";
});

When("informa um usuário inválido", async function () {
  // Cenário de usuário inválido
  this.username = "user_invalido";
});

When("informa uma senha inválida", async function () {
  // Cenário de senha inválida
  this.password = "senha_errada";
});

When("clica no botão Login", async function () {
  // Executa login com as credenciais informadas
  await this.loginPage.login(this.username, this.password);
});

Then("deve ser redirecionado para a página de produtos", async function () {
  // Verifica se a página de produtos foi carregada
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.isLoaded();
});

Then("deve ver uma mensagem de erro", async function () {
  // Valida mensagem de erro na tela de login
  const message = await this.loginPage.getErrorMessage();
  expect(message).toContain("Epic sadface");
});

Then("deve permanecer na tela de login", async function () {
  // Asserts que permanece na URL de login com botão visível
  await expect(this.page).toHaveURL("https://www.saucedemo.com/");
  await expect(this.page.locator("#login-button")).toBeVisible();
});

// ---------- Cenários com usuário autenticado ----------
Given("que o usuário esteja autenticado", async function () {
  // Login direto para cenários que precisam estar autenticados
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
  await this.loginPage.login("standard_user", "secret_sauce");
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.isLoaded();
});

When("acessa a página de produtos", async function () {
});

Then("deve visualizar a lista de produtos", async function () {
  // Confirma que a lista de produtos está visível
  await this.productsPage.isLoaded();
});

Then("cada produto deve exibir nome, preço e botão Add to cart", async function () {
  // Confirma que existe pelo menos um produto na lista
  const items = await this.page.locator(".inventory_item").count();
  expect(items).toBeGreaterThan(0);
});

// ---------- Inserir no carrinho ----------
When("adiciona um produto ao carrinho", async function () {
  // Adiciona o primeiro produto da lista
  await this.productsPage.addFirstProductToCart();
});

Then("o ícone do carrinho deve ser atualizado", async function () {
  // Verifica se o badge do carrinho aparece
  await expect(this.page.locator(".shopping_cart_badge")).toBeVisible();
});

Then("o botão do produto deve mudar para Remove", async function () {
  // Botão do produto indica remoção
  await expect(this.page.locator("button[data-test^='remove']")).toBeVisible();
});

// ---------- Cenários com o carrinho ----------
Given("que o usuário tenha um produto no carrinho", async function () {
  // Garante que existe pelo menos um produto no carrinho
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
  await this.loginPage.login("standard_user", "secret_sauce");
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.isLoaded();
  await this.productsPage.addFirstProductToCart();
});

When("acessa o carrinho", async function () {
  // Navega até o carrinho e inicializa
  await this.productsPage.openCart();
  this.cartPage = new CartPage(this.page);
});

Then("deve visualizar o produto com nome e preço corretos", async function () {
  // Valida a presença do produto no carrinho
  await this.cartPage.isProductVisible();
});

Given("que o usuário esteja no carrinho com produto adicionado", async function () {
  // Passos de login, adiciona produto e abre carrinho
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
  await this.loginPage.login("standard_user", "secret_sauce");
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.isLoaded();
  await this.productsPage.addFirstProductToCart();
  await this.productsPage.openCart();
  this.cartPage = new CartPage(this.page);
});

When("clica no botão Checkout", async function () {
  // Inicia checkout a partir do carrinho
  await this.cartPage.clickCheckout();
  this.checkoutPage = new CheckoutPage(this.page);
});

Then("deve ser redirecionado para a tela de dados do comprador", async function () {
  await expect(this.page).toHaveURL(/checkout-step-one/);
});

// ---------- Checkout ----------
Given("que o usuário esteja na tela de checkout", async function () {
  // Prepara o ambiente para testes de checkout
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
  await this.loginPage.login("standard_user", "secret_sauce");
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.isLoaded();
  await this.productsPage.addFirstProductToCart();
  await this.productsPage.openCart();
  this.cartPage = new CartPage(this.page);
  await this.cartPage.clickCheckout();
  this.checkoutPage = new CheckoutPage(this.page);
});

When("clica em Continue sem preencher os campos", async function () {
  // Tenta avançar sem preencher campos obrigatórios
  await this.checkoutPage.continue();
});

Then("deve visualizar uma mensagem de erro", async function () {
  // Valida que uma mensagem de erro é exibida com campos faltantes
  const message = await this.checkoutPage.getErrorMessage();
  expect(message).toContain("Error");
});

When("preenche os campos obrigatórios com dados válidos", async function () {
  // Preenche o formulário de checkout com dados válidos
  await this.checkoutPage.fillCheckoutForm("Gabriela", "Maranhão", "50000");
});

When("clica em Continue", async function () {
  // Avança para o resumo do pedido
  await this.checkoutPage.continue();
});

Then("deve ser redirecionado para a tela de resumo da compra", async function () {
  // Verifica se a tela de resumo está visível
  await this.checkoutPage.isSummaryVisible();
});

Then("deve visualizar o produto selecionado", async function () {
  // Confirma exibição do item escolhido no resumo
  await expect(this.page.locator(".inventory_item_name")).toBeVisible();
});

Then("deve visualizar o valor total", async function () {
  await expect(this.page.locator(".summary_total_label")).toBeVisible();
});

Then("o botão Finish deve estar disponível", async function () {
  // Verifica se o botão final está disponível
  await expect(this.page.locator("#finish")).toBeVisible();
});

// ---------- Verificações adicionais ----------
Given("que o usuário esteja na página de produtos", async function () {
  this.loginPage = new (require("../pages/login.page"))(this.page);
  await this.loginPage.navigate();
  await this.loginPage.login("standard_user", "secret_sauce");

  this.productsPage = new (require("../pages/products.page"))(this.page);
  await this.productsPage.isLoaded();
});

Then("deve permanecer na tela de checkout", async function () {
  // Aguarda a URL de checkout
  await this.page.waitForURL(/checkout-step-one/);
});

Given("que o usuário esteja na tela de resumo", async function () {
  // Prepara todo o fluxo até a tela de resumo
  this.loginPage = new (require("../pages/login.page"))(this.page);
  await this.loginPage.navigate();
  await this.loginPage.login("standard_user", "secret_sauce");

  this.productsPage = new (require("../pages/products.page"))(this.page);
  await this.productsPage.isLoaded();
  await this.productsPage.addFirstProductToCart();
  await this.productsPage.openCart();

  const CartPage = require("../pages/cart.page");
  this.cartPage = new CartPage(this.page);
  await this.cartPage.clickCheckout();

  const CheckoutPage = require("../pages/checkout.page");
  this.checkoutPage = new CheckoutPage(this.page);
  await this.checkoutPage.fillCheckoutForm("Gabriela", "Maranhao", "50000");
  await this.checkoutPage.continue();

  await this.page.waitForURL(/checkout-step-two/);
});

