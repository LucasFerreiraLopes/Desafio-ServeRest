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
    // Loading product data from fixture
    cy.fixture("productData").then((productData) => {
      // Adding timestamp to ensure uniqueness
      const uniqueProduct = {
        ...productData.validProduct,
        nome: `${productData.validProduct.nome} ${Date.now()}`,
      };

      // Creating product using custom command
      cy.createProductApi(uniqueProduct, authToken).then((createdProduct) => {
        //Checking if the product was created successfully
        expect(createdProduct).to.have.property("_id");
        expect(createdProduct.message).to.eq("Cadastro realizado com sucesso");

        // Store the ID for use in the next test
        createdProductId = createdProduct._id;
      });
    });
  });

  it("should get a product by id successfully", () => {
    // Only execute this test if we have a product ID created
    if (createdProductId) {
      cy.getProductByIdApi(createdProductId, authToken).then((product) => {
        expect(product._id).to.eq(createdProductId);
      });
    } else {
      // If we don't have a product ID, skip the test
      cy.log("Skipping test - no product ID was created previously");
    }
  });

  it("should update a product successfully", () => {
    // Only execute this test if we have a product ID created
    if (createdProductId) {
      // Data to update the product with unique name
      const updateData = {
        nome: `Cypress Mouse Updated ${Date.now()}`,
        preco: 500,
        descricao: "Mouse Updated",
        quantidade: 400,
      };
      cy.updateProductApi(createdProductId, updateData, authToken).then(
        (updatedProduct) => {
          // Validate only what the API really returns
          expect(updatedProduct).to.have.property("message");
          expect(updatedProduct.message).to.eq("Registro alterado com sucesso");
        }
      );
    } else {
      // If we don't have a product ID, skip the test
      cy.log("Skipping test - no product ID was created previously");
    }
  });

  it("should delete a product successfully", () => {
    // Only execute this test if we have a product ID created
    if (createdProductId) {
      cy.deleteProductApi(createdProductId, authToken).then(
        (deletedProduct) => {
          expect(deletedProduct).to.have.property("message");
          expect(deletedProduct.message).to.eq("Registro excluído com sucesso");
        }
      );
    } else {
      // If we don't have a product ID, skip the test
      cy.log("Skipping test - no product ID was created previously");
    }
  });
});
