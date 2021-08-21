/**
 * Test the flow of placing an order
 * Place products in shopping cart, edit the cart and place the order.
 * @author Marc Specht
 */
describe("shop", () => {

    /**
     * Login to the application
     */
    it("Login", () => cy.login('ADMIN', 'test'));

    it("Go to shop", () => {
        cy.get('[data-controller="shopOverview"]').click();
        cy.url().should('match', /#shopOverview$/);
    });

    it("Put 2 items in shopping cart", () => {
        // Wait for content to load
        cy.wait(1000);

        cy.get('.product-overview').eq(3).click();
        cy.get('.product-overview').eq(4).click();
    });

    it("Go to shopping cart", () => {
        cy.get('.btn-shopping-cart').click();
        cy.url().should('match', /#shoppingCart$/);
    });

    it("Edit order in shopping cart", () => {
        // Wait for content to load
        cy.wait(1000);

        cy.get('.plus-btn').eq(0).click();
        cy.get('input.product-quantity').eq(0).should('not.have.value', '1');

        cy.get('.minus-btn').eq(0).click();
        cy.get('input.product-quantity').eq(0).should('not.have.value', '2');

        cy.get('button.product-remove').eq(1).click();
        // Check if product is removed
        cy.get('.grid--shopping-cart--product').its('length').should('eq', 1);
    });

    it('Checkout', () => {
        cy.get('#checkoutButton').click();
        cy.url().should('match', /#shoppingCart$/);
    });

    it('Back to store', () => {
        cy.get('#backToStoreButton').click();
        cy.url().should('match', /#shopOverview$/);
    });
});