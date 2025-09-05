Cypress.Commands.add("createAdminApi", () => {
  const timestamp = Date.now();
  const user = {
    nome: `Cypress Admin ${timestamp}`,
    email: `cypress_admin_${timestamp}@cypress.com`,
    password: "123456",
    administrador: "true",
  };

  return cy
    .request("POST", "https://serverest.dev/usuarios", user)
    .then((res) => {
      expect(res.status).to.eq(201);
      return user;
    });
});

Cypress.Commands.add("loginApi", (email, password) => {
  return cy
    .request("POST", "https://serverest.dev/login", { email, password })
    .then((res) => {
      expect(res.status).to.eq(200);
      const authorization = res.body && res.body.authorization;
      expect(authorization, "authorization").to.be.a("string");
      return authorization;
    });
});

Cypress.Commands.add("injectAuthToken", (authorization) => {
  return cy.visit("/", {
    onBeforeLoad(win) {
      win.localStorage.setItem("serverest/userToken", authorization);
    },
  });
});

Cypress.Commands.add("ensureAdminSessionApi", () => {
  cy.session("admin-api-session", () => {
    cy.createAdminApi().then((user) => {
      cy.loginApi(user.email, user.password).then((authorization) => {
        cy.injectAuthToken(authorization);
        cy.visit("/admin/home");
        cy.url().should("include", "/admin/home");
      });
    });
  });
});

Cypress.Commands.add("createUserAdmin", (user) => {
  cy.visit("/");
  cy.get('[data-testid="cadastrar"]').click();
  cy.get('[data-testid="nome"]').type(user.userName);
  cy.get('[data-testid="email"]').type(user.userEmail);
  cy.get('[data-testid="password"]').type(user.userPassword);
  cy.get('[data-testid="checkbox"]').check();
  cy.get('[data-testid="cadastrar"]').click();
  cy.get(".alert").should("contain.text", "Cadastro realizado com sucesso");
  cy.url().should("include", "/admin/home");

  cy.wrap(user);
});

Cypress.Commands.add("login", (userEmail, userPassword) => {
  cy.visit("/");
  cy.get('[data-testid="email"]').type(userEmail);
  cy.get('[data-testid="senha"]').type(userPassword);
  cy.get('[data-testid="entrar"]').click();
  cy.url().should("include", "/admin/home");
});
