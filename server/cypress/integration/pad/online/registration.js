/**
 * Test for the registration page
 * @author Tico Vermeer
 */

describe("registration", () =>{

    it("Validate registration form", () =>{
        cy.visit('http://localhost:8080/#registration')

        // Check if the login button redirects correctly
        cy.get('#loginButton').click()
        cy.url().should("match", /#login$/)

        // Check if button on login page redirects correctly
        cy.get('#registerButton').click()
        cy.url().should('match', /#registration$/)

        // Check duplicate seat number error
        cy.get('#inputSeatNumber').type("admin")
        cy.get('#inputPassword').type("123")
        cy.get('#inputPasswordConfirm').type("123")
        cy.get('#registerButton').click()
        cy.get('.error').contains("Seat number already exists")

        // Clears the input fields
        cy.get('#inputSeatNumber').clear()
        cy.get('#inputPassword').clear()
        cy.get('#inputPasswordConfirm').clear()

        // Check if passwords are the exact same
        cy.get('#inputSeatNumber').type("cytest")
        cy.get('#inputPassword').type("123")
        cy.get('#inputPasswordConfirm').type("1234")
        cy.get('#registerButton').click()
        cy.get('.error').contains("Passwords do not match")

        // Clears the input fields
        cy.get('#inputSeatNumber').clear()
        cy.get('#inputPassword').clear()
        cy.get('#inputPasswordConfirm').clear()

        // Check if you can register with a random seat number
        cy.get('#inputSeatNumber').type(Math.floor(Math.random() * 100000))
        cy.get('#inputPassword').type("password")
        cy.get('#inputPasswordConfirm').type("password")
        cy.get('#registerButton').click()
        cy.url().should("match", /#home/)

    })
})