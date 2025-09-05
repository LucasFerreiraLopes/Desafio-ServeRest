Cypress.Commands.add("userRegister", () => {
  cy.visit("/admin/home");
  cy.get('[data-testid="cadastrarUsuarios"]').click();
  cy.url().should("include", "/admin/cadastrarusuarios");
  cy.get('[data-testid="nome"]').type("Cypress User");
  const uniqueUserEmail = `Cypress_${Date.now()}@Cypress.com`;
  cy.get('[data-testid="email"]').type(uniqueUserEmail);
  cy.get('[data-testid="password"]').type("123456");
  cy.get('[data-testid="cadastrarUsuario"]').click();
  cy.url().should("include", "/admin/listarusuarios");
});

Cypress.Commands.add("userList", () => {
  cy.visit("/admin/home");
  cy.get('[data-testid="listar-usuarios"]').click();
});

Cypress.Commands.add("createUserApi", (userData, authorization) => {
  return cy
    .request({
      method: "POST",
      url: "https://serverest.dev/usuarios",
      body: userData,
      headers: {
        Authorization: authorization,
      },
    })
    .then((res) => {
      expect(res.status).to.eq(201);
      return res.body;
    });
});

Cypress.Commands.add("getUserByIdApi", (userId, authorization) => {
  return cy
    .request({
      method: "GET",
      url: `https://serverest.dev/usuarios/${userId}`,
      headers: {
        Authorization: authorization,
      },
    })
    .then((res) => {
      expect(res.status).to.eq(200);
      return res.body;
    });
});

Cypress.Commands.add("updateUserApi", (userId, userData, authorization) => {
  return cy
    .request({
      method: "PUT",
      url: `https://serverest.dev/usuarios/${userId}`,
      body: userData,
      headers: {
        Authorization: authorization,
      },
    })
    .then((res) => {
      expect(res.status).to.eq(200);
      return res.body;
    });
});

Cypress.Commands.add("deleteUserApi", (userId, authorization) => {
  return cy
    .request({
      method: "DELETE",
      url: `https://serverest.dev/usuarios/${userId}`,
      headers: {
        Authorization: authorization,
      },
    })
    .then((res) => {
      expect(res.status).to.eq(200);
      return res.body;
    });
});
