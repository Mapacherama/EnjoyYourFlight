describe("login", () =>{

    it("Validate login form", () =>{
        cy.visit('#login')

        cy.get('#registerButton').click()
        cy.url().should('match', /registration$/)

        cy.get('#loginButton').click()
        cy.url().should('match', /#login$/)

        cy.get('#passwordResetButton').click()
        cy.url().should('match', /#passwordReset$/)

        cy.get('#cancelButton').click()
        cy.url().should('match', /#login$/)

        cy.get('#exampleInputUsername').type('10B')
        cy.get('#exampleInputPassword').type('333')
        cy.get('#login').click()

        cy.get('.error').contains('Wrong seat number and/or password')

        cy.get('#exampleInputUsername').clear()
        cy.get('#exampleInputPassword').clear()

        cy.get('#exampleInputUsername').type('10A')
        cy.get('#exampleInputPassword').type('test')
        cy.get('#login').click()

        cy.url().should('match', /#home$/)


    })
})