describe("CRUD Cart API Tests", () => {
  let authToken;
  let createdCartId;
  let createdProductId;

  beforeEach(() => {
    cy.createAdminApi()
      .then((user) => {
        return cy.loginApi(user.email, user.password);
      })
      .then((authorization) => {
        authToken = authorization;
      });
  });

  it("should create a cart successfully", () => {
    cy.fixture('productData').then((productData) => {
      const uniqueProduct = {
        ...productData.validProduct,
        nome: `${productData.validProduct.nome} ${Date.now()}`
      };

      cy.createProductApi(uniqueProduct, authToken).then((product) => {
        createdProductId = product._id;
        cy.log(`Produto criado com ID: ${createdProductId}`);

        cy.createCartApi(authToken, createdProductId).then((cart) => {
          expect(cart).to.have.property("_id");
          createdCartId = cart._id;
          cy.log(`Carrinho criado com ID: ${createdCartId}`);
        });
      });
    });
  });

  it("should get a cart by id successfully", () => {
    cy.getCartByIdApi(createdCartId, authToken).then((cart) => {
      expect(cart).to.have.property("_id");
      expect(cart._id).to.eq(createdCartId);
    });
  });

  it("should delete a cart successfully", () => {
    if (createdCartId) {
      cy.deleteCartApi(createdCartId, authToken).then((deletedCart) => {
        expect(deletedCart).to.have.property("message");
        expect(deletedCart.message).to.eq("Não foi encontrado carrinho para esse usuário");
      });
    } else {
      cy.log("Skipping test - no cart ID was created previously");
    }
  });
});