describe("Register and Login flow with an admin user", () => {
  let user;

  before(() => {
    const uniqueId = Date.now();
    user = {
      userName: `Cypress User ${uniqueId}`,
      userEmail: `Cypress_${uniqueId}@Cypress.com`,
      userPassword: `123456`,
    };
  });

  it("should register an admin user and redirect to home page", () => {
    cy.createUserAdmin(user);
    cy.wait("@LoginPOST").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
    cy.get("h1").should("contain.text", "Bem Vindo");
    cy.url().should("include", "/admin/home");
  });

  it("should login with valid credentials", () => {
    cy.login(user.userEmail, user.userPassword);
    cy.wait("@LoginPOST").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
    cy.get("h1").should("contain.text", "Bem Vindo");
    cy.url().should("include", "/admin/home");
  });

  it("should not login with invalid credentials", () => {
    cy.visit("/");
    const uniqueEmail = `Cypress ${Date.now()}`;
    cy.get('[data-testid="email"]').type(uniqueEmail + "@cypress.com");
    cy.get('[data-testid="senha"]').type("123456");
    cy.get('[data-testid="entrar"]').click();
    cy.wait("@LoginPOST").then((interception) => {
      expect(interception.response.statusCode).to.eq(401);
    });
    cy.contains("Email e/ou senha inválidos").should("be.visible");
  });
});
