describe("CRUD User API Tests", () => {
  let authToken;
  let createdUserId;

  beforeEach(() => {
    // Using existing command to create admin and get token
    cy.createAdminApi()
      .then((user) => {
        return cy.loginApi(user.email, user.password);
      })
      .then((authorization) => {
        authToken = authorization;
      });
  });

  it("should create a user successfully", () => {
    // Loading user data from fixture
    cy.fixture('userData').then((userData) => {
      const uniqueUser = {
        ...userData.validUser,
        nome: `${userData.validUser.nome} ${Date.now()}`,
        email: `usuario_${Date.now()}@cypress.com`
      };

      // Creating user using custom command
      cy.createUserApi(uniqueUser, authToken).then((createdUser) => {
        expect(createdUser).to.have.property("_id");
        expect(createdUser.message).to.eq("Cadastro realizado com sucesso");
        
        // Store the ID for use in the next test
        createdUserId = createdUser._id;
      });
    });
  });

  it("should get a user by id successfully", () => {
    // Only execute this test if we have a user ID created
    if (createdUserId) {
      cy.getUserByIdApi(createdUserId, authToken).then((user) => {
        expect(user).to.have.property("_id");
        expect(user._id).to.eq(createdUserId);
      });
    } else {
      // If we don't have a user ID, skip the test
      cy.log("Skipping test - no user ID was created previously");
    }
  });

  it("should update a user successfully", () => {
    // Only execute this test if we have a user ID created
    if (createdUserId) {
      const updateData = {
        nome: `User Updated ${Date.now()}`,
        email: `user_updated_${Date.now()}@cypress.com`,
        password: "123456",
        administrador: "false"
      };

      cy.updateUserApi(createdUserId, updateData, authToken).then((updatedUser) => {
        expect(updatedUser).to.have.property("message");
        expect(updatedUser.message).to.eq("Registro alterado com sucesso");
      });
    } else {
      // If we don't have a user ID, skip the test
      cy.log("Skipping test - no user ID was created previously");
    }
  });

 it("should delete a user successfully", () => {
   if (createdUserId) {
    cy.deleteUserApi(createdUserId, authToken).then((deletedUser) => {
      expect(deletedUser).to.have.property("message");
      expect(deletedUser.message).to.eq("Registro excluído com sucesso");
    });
   } else {
    cy.log("Skipping test - no user ID was created previously");
   }    
  });
});