Cypress.Commands.add("productRegister", () => {
  cy.visit("/admin/home");
  cy.get('[data-testid="cadastrarProdutos"]').click();
  const uniqueProductName = `Cypress Product ${Date.now()}`;
  cy.get('[data-testid="nome"]').type(uniqueProductName);
  cy.get('[data-testid="preco"]').type("10");
  cy.get('[data-testid="descricao"]').type("Product Description");
  cy.get('[data-testid="quantity"]').type("10");
  cy.get('[data-testid="imagem"]').selectFile("cypress/fixtures/image.jpg");
  cy.get('[data-testid="cadastarProdutos"]').click();
});

Cypress.Commands.add("productList", () => {
  cy.visit("/admin/home");
  cy.get('[data-testid="listarProdutos"]').click();
  cy.url().should("include", "/admin/listarprodutos");
});

Cypress.Commands.add("createProductApi", (productData, authorization) => {
  return cy
    .request({
      method: "POST",
      url: "https://serverest.dev/produtos",
      body: productData,
      headers: {
        Authorization: authorization,
      },
    })
    .then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("_id");
      expect(res.body.message).to.eq("Cadastro realizado com sucesso");
      return res.body;
    });
});

Cypress.Commands.add("getProductByIdApi", (productId, authorization) => {
  return cy
    .request({
      method: "GET",
      url: `https://serverest.dev/produtos/${productId}`,
      headers: {
        Authorization: authorization,
      },
    })
    .then((res) => {
      expect(res.status).to.eq(200);
      return res.body;
    });
});

Cypress.Commands.add("updateProductApi", (productId, productData, authorization) => {
  return cy
    .request({
      method: "PUT",
      url: `https://serverest.dev/produtos/${productId}`,
      body: productData,
      headers: {
        Authorization: authorization,
      },
    })
    .then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq("Registro alterado com sucesso");
      return res.body;
    });
});

Cypress.Commands.add("deleteProductApi", (productId, authorization) => {
  return cy
    .request({
      method: "DELETE",
      url: `https://serverest.dev/produtos/${productId}`,
      headers: {
        Authorization: authorization,
      },
    })
    .then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq("Registro excluído com sucesso");
      return res.body;
    });
});
