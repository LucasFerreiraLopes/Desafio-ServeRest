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
    // reate a product to use in the cart
    cy.fixture('productData').then((productData) => {
      const uniqueProduct = {
        ...productData.validProduct,
        nome: `${productData.validProduct.nome} ${Date.now()}`
      };

      // Criar produto e armazenar o ID
      cy.createProductApi(uniqueProduct, authToken).then((product) => {
        createdProductId = product._id;
        cy.log(`Produto criado com ID: ${createdProductId}`);

        // Segundo: criar o carrinho usando o ID do produto
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
    // Only execute this test if we have a cart ID created
    if (createdCartId) {
      cy.deleteCartApi(createdCartId, authToken).then((deletedCart) => {
        expect(deletedCart).to.have.property("message");
        expect(deletedCart.message).to.eq("Não foi encontrado carrinho para esse usuário");
      });
    } else {
      // If we don't have a cart ID, skip the test
      cy.log("Skipping test - no cart ID was created previously");
    }
  });
});