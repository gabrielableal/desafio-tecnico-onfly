Feature: Fluxo de compra no e-commerce SauceDemo
  Como um cliente
  Quero navegar, adicionar produtos ao carrinho e iniciar o checkout
  Para poder realizar uma compra

  # TC1
  Scenario: Login com credenciais válidas
    Given que o usuário esteja na página de login
    When informa um usuário válido
    And informa uma senha válida
    And clica no botão Login
    Then deve ser redirecionado para a página de produtos

  # TC2
  Scenario: Login com credenciais inválidas
    Given que o usuário esteja na página de login
    When informa um usuário inválido
    And informa uma senha inválida
    And clica no botão Login
    Then deve ver uma mensagem de erro
    And deve permanecer na tela de login

  # TC3
  Scenario: Visualizar lista de produtos após login
    Given que o usuário esteja autenticado
    When acessa a página de produtos
    Then deve visualizar a lista de produtos
    And cada produto deve exibir nome, preço e botão Add to cart

  # TC4
  Scenario: Adicionar produto ao carrinho
    Given que o usuário esteja na página de produtos
    When adiciona um produto ao carrinho
    Then o ícone do carrinho deve ser atualizado
    And o botão do produto deve mudar para Remove

  # TC5
  Scenario: Visualizar carrinho com produto adicionado
    Given que o usuário tenha um produto no carrinho
    When acessa o carrinho
    Then deve visualizar o produto com nome e preço corretos

  # TC7
  Scenario: Iniciar checkout
    Given que o usuário esteja no carrinho com produto adicionado
    When clica no botão Checkout
    Then deve ser redirecionado para a tela de dados do comprador

  # TC8
  Scenario: Tentar continuar checkout sem preencher dados obrigatórios
    Given que o usuário esteja na tela de checkout
    When clica em Continue sem preencher os campos
    Then deve visualizar uma mensagem de erro
    And deve permanecer na tela de checkout

  # TC9
  Scenario: Preencher dados válidos no checkout
    Given que o usuário esteja na tela de checkout
    When preenche os campos obrigatórios com dados válidos
    And clica em Continue
    Then deve ser redirecionado para a tela de resumo da compra

  # TC10
  Scenario: Visualizar resumo da compra
    Given que o usuário esteja na tela de resumo
    Then deve visualizar o produto selecionado
    And deve visualizar o valor total
    And o botão Finish deve estar disponível
