describe("CRUD Product API Tests", () => {
  let authToken;
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

  it("should create a product successfully", () => {
    cy.fixture("productData").then((productData) => {
      const uniqueProduct = {
        ...productData.validProduct,
        nome: `${productData.validProduct.nome} ${Date.now()}`,
      };

      cy.createProductApi(uniqueProduct, authToken).then((createdProduct) => {
        expect(createdProduct).to.have.property("_id");
        expect(createdProduct.message).to.eq("Cadastro realizado com sucesso");

        createdProductId = createdProduct._id;
      });
    });
  });

  it("should get a product by id successfully", () => {
    if (createdProductId) {
      cy.getProductByIdApi(createdProductId, authToken).then((product) => {
        expect(product._id).to.eq(createdProductId);
      });
    } else {
      cy.log("Skipping test - no product ID was created previously");
    }
  });

  it("should update a product successfully", () => {
    if (createdProductId) {
      const updateData = {
        nome: `Cypress Mouse Updated ${Date.now()}`,
        preco: 500,
        descricao: "Mouse Updated",
        quantidade: 400,
      };
      cy.updateProductApi(createdProductId, updateData, authToken).then(
        (updatedProduct) => {
          expect(updatedProduct).to.have.property("message");
          expect(updatedProduct.message).to.eq("Registro alterado com sucesso");
        }
      );
    } else {
      cy.log("Skipping test - no product ID was created previously");
    }
  });

  it("should delete a product successfully", () => {
    if (createdProductId) {
      cy.deleteProductApi(createdProductId, authToken).then(
        (deletedProduct) => {
          expect(deletedProduct).to.have.property("message");
          expect(deletedProduct.message).to.eq("Registro excluído com sucesso");
        }
      );
    } else {
      cy.log("Skipping test - no product ID was created previously");
    }
  });
});
