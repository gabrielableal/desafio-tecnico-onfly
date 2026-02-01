# Desafio Técnico – QA Pleno

## Sobre o Projeto

Este projeto foi desenvolvido como parte de um desafio técnico para a vaga de Analista de QA Pleno, com o objetivo de validar um fluxo de compra de um e-commerce público, utilizando boas práticas de testes manuais e automatizados.

### E-commerce Testado

**SauceDemo**  
🔗 [https://www.saucedemo.com](https://www.saucedemo.com)

**Credenciais de Teste:**
- Usuário: `standard_user`
- Senha: `secret_sauce`

### Escopo da Solução

- Análise de risco
- Priorização de cenários
- Testes E2E com Playwright
- Testes de API com Postman
- Visão de qualidade do produto testado

---

## Fluxo de Negócio Validado

O fluxo crítico testado neste projeto é:

```
Login → Listagem de Produtos → Carrinho → Checkout → Resumo da compra
```

Esse fluxo representa o caminho principal de conversão do e-commerce e, portanto, foi priorizado nos testes automatizados.

---

## Casos de Teste

### Cobertura de Testes

Os casos de teste foram definidos para cobrir: Caminhos felizes, Validações de erro e Regras básicas de negócio;

### Casos Automatizados

Os cenários mais críticos foram priorizados para automação:

| ID | Descrição |
|---|---|
| TC1 | Login com credenciais válidas |
| TC2 | Login com credenciais inválidas |
| TC3 | Visualizar lista de produtos após login |
| TC4 | Adicionar produto ao carrinho |
| TC5 | Visualizar carrinho com produto adicionado |
| TC7 | Iniciar checkout |
| TC8 | Tentar continuar checkout sem preencher dados obrigatórios |
| TC9 | Preencher dados válidos no checkout |
| TC10 | Visualizar resumo da compra |

### Casos de Teste Manual

**TC6 - Remover produto do carrinho**

Este caso foi mantido como teste manual por apresentar menor impacto no fluxo crítico do negócio. Ele valida a capacidade do usuário de remover itens do carrinho, porém não bloqueia o fluxo principal de compra. 

---

## Tecnologias Utilizadas

### Testes E2E com Playwright

A automação foi implementada utilizando **Playwright** e **JavaScript**, seguindo boas práticas de: Seletores eficientes, Organização de código, Page Object Model. Os testes simulam o comportamento real do usuário, garantindo a validação de ponta a ponta do fluxo de compra.

### Testes de API com Postman

Foram realizados testes de API utilizando o **Postman** com a API pública **GoRest**.

🔗 [https://gorest.co.in](https://gorest.co.in)

**Métodos Testados:**
- GET
- POST
- PUT
- DELETE

**Validações:**
- Status code
- Estrutura da resposta
- Comportamento esperado dos endpoints

> **Importante:** Para executar os testes de API, importe a collection no Postman e selecione o Environment GoRest antes de executar as requisições.

---

## Evidências

O projeto contém evidências completas da execução dos testes:

- Relatório HTML do Cucumber
- Resultados dos testes do Postman
- Screenshots
- Vídeos

---

## Como Executar

### Instalar Dependências e Browsers

```powershell
npm run setup
```

### Executar Todos os Testes (Cucumber)

```powershell
npm test
```

### Gerar Relatório

```powershell
npm run test:report
```

> **Nota:** O relatório é gerado automaticamente conforme configurado no `cucumber.js`
