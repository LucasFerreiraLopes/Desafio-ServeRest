describe("CRUD User API Tests", () => {
  let authToken;
  let createdUserId;

  beforeEach(() => {
    cy.createAdminApi()
      .then((user) => {
        return cy.loginApi(user.email, user.password);
      })
      .then((authorization) => {
        authToken = authorization;
      });
  });

  it("should create a user successfully", () => {
    cy.fixture('userData').then((userData) => {
      const uniqueUser = {
        ...userData.validUser,
        nome: `${userData.validUser.nome} ${Date.now()}`,
        email: `usuario_${Date.now()}@cypress.com`
      };

      cy.createUserApi(uniqueUser, authToken).then((createdUser) => {
        expect(createdUser).to.have.property("_id");
        expect(createdUser.message).to.eq("Cadastro realizado com sucesso");
        
        createdUserId = createdUser._id;
      });
    });
  });

  it("should get a user by id successfully", () => {
    if (createdUserId) {
      cy.getUserByIdApi(createdUserId, authToken).then((user) => {
        expect(user).to.have.property("_id");
        expect(user._id).to.eq(createdUserId);
      });
    } else {
      cy.log("Skipping test - no user ID was created previously");
    }
  });

  it("should update a user successfully", () => {
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