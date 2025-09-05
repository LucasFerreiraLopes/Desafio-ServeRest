class Routes {
    init() {
        // Auth endpoints
        cy.intercept('POST', 'https://serverest.dev/login').as('LoginPOST')
        
        // User endpoints
        cy.intercept('POST', 'https://serverest.dev/usuarios').as('UserPOST')
        cy.intercept('GET', 'https://serverest.dev/usuarios').as('UserGET')
        cy.intercept('GET', 'https://serverest.dev/usuarios/*').as('UserGETById')
        cy.intercept('PUT', 'https://serverest.dev/usuarios/*').as('UserPUT')
        cy.intercept('DELETE', 'https://serverest.dev/usuarios/*').as('UserDELETE')
        
        
        // Product endpoints
        cy.intercept('POST', 'https://serverest.dev/produtos').as('ProductPOST')
        cy.intercept('GET', 'https://serverest.dev/produtos').as('ProductGET')
        cy.intercept('GET', 'https://serverest.dev/produtos/*').as('ProductGETById')
        cy.intercept('PUT', 'https://serverest.dev/produtos/*').as('ProductPUT')
        cy.intercept('DELETE', 'https://serverest.dev/produtos/*').as('ProductDELETE')
        


        // Cart endpoints
        cy.intercept('POST', 'https://serverest.dev/carrinhos').as('CartPOST')
        cy.intercept('GET', 'https://serverest.dev/carrinhos').as('CartGET')
        cy.intercept('GET', 'https://serverest.dev/carrinhos/*').as('CartGETById')
        cy.intercept('DELETE', 'https://serverest.dev/carrinhos/concluir-compra').as('CartDELETE')


    }
}

export default Routes;