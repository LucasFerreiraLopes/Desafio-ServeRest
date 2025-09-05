# ServeRest - Testes Automatizados com Cypress

##  Descrição

Projeto de testes automatizados com Cypress 15 (JavaScript) para a aplicação [ServeRest](https://serverest.dev). Contém cenários E2E de frontend e testes de API que validam os fluxos principais de autenticação, usuários, produtos e carrinhos.

## 🎯 Funcionalidades Testadas

- **Frontend (E2E)**: Registro de usuários, login, cadastro de produtos, listagem
- **Backend (API)**: CRUD completo de usuários, produtos e carrinhos
- **Autenticação**: Sistema de login com tokens JWT
- **Validações**: Cenários positivos e negativos

## ⚙️ Pré-requisitos

- **Node.js**: Versão 18 ou superior (validado em Node 22)
- **npm**: Versão 9 ou superior
- **Cypress**: Versão 15 (instalado automaticamente)

## 📦 Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd Desafio_Serverest
```

### 2. Instale as dependências
```bash
npm install
```

## ▶️ Executando os Testes

### Executar Todos os Testes

#### Modo Interativo (GUI)
```bash
npx cypress open
```

#### Modo Headless (CI/CD)
```bash
npx cypress run
```

### Executar Testes Específicos

#### Apenas Testes de API
```bash
npm run cy:backend
```

#### Apenas Testes de Frontend (E2E)
```bash
npm run cy:frontend
```

#### Teste Específico
```bash
npx cypress run --spec "cypress/e2e/backend/product.cy.js"
```

## 🏗️ Arquitetura e Boas Práticas
- Setup rápido: criação de dados via API

- Eficiência: reuso de sessão com cy.session

- Estabilidade: seletores data-testid em elementos críticos

## 📊 Cobertura de Testes

### Frontend (E2E)
- ✅ Cadastro usuário
- ✅ Login válido/inválido
- ✅ Cadastro de produtos

### Backend (API)
- ✅ CRUD completo de produtos
- ✅ CRUD completo de usuários
- ✅ Operações de carrinho (criar, buscar, finalizar)

## 🚨 Tratamento de Erros

- **Retries automáticos**: Configurado para 2 tentativas em modo CI
- **Validações robustas**: Status codes, mensagens de erro, estrutura de resposta
- **Logs detalhados**: Informações para debug e troubleshooting

## 💡Conceitos Utilizados
- [Cypress Hooks](https://www.toolsqa.com/cypress/cypress-hooks)
- [Arrange/Act/Assert(AAA)](https://automationpanda.com/2020/07/07/arrange-act-assert-a-pattern-for-writing-good-tests)
- [Background Login](https://docs.cypress.io/api/commands/session)
- [Random Data](https://www.repeato.app/effective-strategies-for-using-random-test-data-in-automated-testing)
- [App Actions](https://www.cypress.io/blog/stop-using-page-objects-and-start-using-app-actions)


---

**Desenvolvido usando apenas Cypress 15 e JavaScript**