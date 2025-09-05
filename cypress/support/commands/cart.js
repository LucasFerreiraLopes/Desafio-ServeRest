Cypress.Commands.add("createCartApi", (authorization, productId) => {
  return cy
    .request({
      method: "POST",
      url: "https://serverest.dev/carrinhos",
      body: {
        produtos: [
          {
            idProduto: productId,
            quantidade: 1,
          },
        ],
      },
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

Cypress.Commands.add("getCartByIdApi", (cartId, authorization) => {
  return cy
    .request({
      method: "GET",
      url: `https://serverest.dev/carrinhos/${cartId}`,
      headers: {
        Authorization: authorization,
      },
    })
    .then((res) => {
      expect(res.status).to.eq(200);
      return res.body;
    });
});

Cypress.Commands.add("deleteCartApi", (cartId, authorization) => {
  return cy
    .request({
      method: "DELETE",
      url: "https://serverest.dev/carrinhos/concluir-compra",
      headers: {
        Authorization: authorization,
      },
    })
    .then((res) => {
      expect(res.status).to.eq(200);
      return res.body;
    });
});
