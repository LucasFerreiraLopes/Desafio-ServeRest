describe('User Registration and List flow', () => {

  beforeEach(() => {
    cy.ensureAdminSessionApi();
  });

  it('should register a user and redirect to user list page', () => {
    cy.userRegister()
    cy.wait('@UserPOST').then((interception) => {
      expect(interception.response.statusCode).to.eq(201)
    })
    cy.url().should('include', '/admin/listarusuarios')
  })


  it('should list users and validate if table is visible', () => {
    cy.userList()
    cy.wait('@UserGET').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
    cy.url().should('include', '/admin/listarusuarios')
    cy.get("table tbody tr").should("be.visible");
  })
})