describe("Product Registration and List flow", () => {

  beforeEach(() => {
    cy.ensureAdminSessionApi();
  });

  it("should register a product and redirect to product list page", () => {
    cy.productRegister();
    cy.wait("@ProductPOST").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
    });
    cy.get("h1").should("contain.text", "Lista dos Produtos");
  });

  it("should list products and validate if table is visible", () => {
    cy.productList();
    cy.wait("@ProductGET").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
    cy.get("h1").should("contain.text", "Lista dos Produtos");
    cy.get("table tbody tr").should("be.visible");
  });
});
