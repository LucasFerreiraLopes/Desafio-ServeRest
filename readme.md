# ServeRest - Testes Automatizados com Cypress
[![Cypress](https://img.shields.io/badge/Cypress-15.0.0-brightgreen)](https://www.cypress.io/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Enabled-blue)](https://github.com/features/actions)

##  Descrição

Projeto de testes automatizados com Cypress 15 (JavaScript) para a aplicação [ServeRest](https://serverest.dev). Contém cenários E2E de frontend e testes de API que validam os fluxos principais de autenticação, usuários, produtos e carrinhos.

## 🎯 Funcionalidades Testadas

- **Frontend (E2E)**: Registro de usuários, login, cadastro de produtos, listagem
- **Backend (API)**: CRUD completo de usuários, produtos e carrinhos
- **Autenticação**: Sistema de login com tokens JWT
- **Validações**: Cenários positivos e negativos

### 📈 Resultados
- **6 cenários de teste** (3 E2E + 3 API)
- **Cobertura** dos principais fluxos 
- **CI/CD configurado** com GitHub Actions
- **Arquitetura modular** e manutenível

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

### Estrutura Modular
- **Commands organizados**: Separação por funcionalidade (auth, product, cart, user)
- **Intercepts configurados**: Sincronização com APIs para validação de requisições
- **Fixtures**: Dados de teste centralizados e reutilizáveis
- **Sessions**: Reutilização de autenticação entre testes

### Estratégias de Teste
- **Setup rápido**: Criação de dados via API para testes E2E
- **Seletores estáveis**: Uso de `data-testid` em elementos críticos
- **Dados únicos**: Timestamps para evitar conflitos de dados

## ⚠️ Limitações da Aplicação

### Banco de Dados
- **Limpeza periódica**: A aplicação ServeRest limpa o banco de dados periodicamente
- **Impacto**: Dados criados em testes anteriores podem não estar disponíveis
- **Estratégia**: Cada teste cria seus próprios dados únicos usando timestamps

### Dependências entre Testes
- **Contexto**: Alguns testes compartilham dados para otimizar tempo de execução
- **Justificativa**: Contornar limitações de limpeza do banco
- **Implementação**: Uso de variáveis compartilhadas com validação condicional

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
- **Intercepts**: Captura de requisições para validação de APIs
- **Fallback**: Estratégias para lidar com limitações da aplicação

## 🚀 CI/CD com GitHub Actions (Implementação Adicional)

### Configuração
- **Trigger**: Push e Pull Requests na branch `main`
- **Agendamento**: Execução diária às 12:00 (cron job)
- **Ambiente**: Ubuntu Latest com Node.js 22
- **Estratégia**: Execução sequencial (API → E2E)

### Funcionalidades
- **Execução Automática**: Testes rodam automaticamente em push/PR
- **Artifacts**: Screenshots salvos apenas em caso de falha e vídeos sempre salvos
- **Retries**: Configurado para 2 tentativas em modo CI
- **Logs Detalhados**: Informações completas para debug

## 💡Conceitos Utilizados
- [Cypress Hooks](https://www.toolsqa.com/cypress/cypress-hooks)
- [Arrange/Act/Assert(AAA)](https://automationpanda.com/2020/07/07/arrange-act-assert-a-pattern-for-writing-good-tests)
- [Background Login](https://docs.cypress.io/api/commands/session)
- [Random Data](https://www.repeato.app/effective-strategies-for-using-random-test-data-in-automated-testing)
- [App Actions](https://www.cypress.io/blog/stop-using-page-objects-and-start-using-app-actions)
- [Github Actions](https://docs.cypress.io/app/continuous-integration/github-actions)


---

**Desenvolvido usando apenas Cypress 15 e JavaScript**