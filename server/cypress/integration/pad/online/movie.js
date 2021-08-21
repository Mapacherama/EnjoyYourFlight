describe("Movie", () =>{

    it("Validate Movie Overview and Movie", () =>{


        // visit site
        cy.visit('#login')

        // login as admin
        cy.login('ADMIN', 'test');

        // click on div with movieOverview as dataController
        cy.get('[data-controller="movieOverview"]').click()

        // hover over the first movie
        cy.get('[src="./assets/img/films/eyf1.jpg"]').trigger('mouseover')

        // hover over the second movie
        cy.get('[src="./assets/img/films/AScannerDarkly.jpg"]').trigger('mouseover')

        // hover over the first movie
        cy.get('[src="./assets/img/films/eyf1.jpg"]').trigger('mouseover')

        // click on the first movie
        cy.get('[src="./assets/img/films/eyf1.jpg"]').click()

        // close movie description page
        cy.get('#close').click()

        // hover over the second movie
        cy.get('[src="./assets/img/films/AScannerDarkly.jpg"]').trigger('mouseover')

        // click on the second movie
        cy.get('[src="./assets/img/films/AScannerDarkly.jpg"]').click()

        // open movie page
        cy.get('#play').click()

        // play movie
        cy.get('.vjs-big-play-button').click()

        // pause movie
        cy.get('.vjs-play-control').click()

        // resume movie
        cy.get('.vjs-play-control').click()

        // pause movie
        cy.get('.vjs-play-control').click()

        // go back to movieOverview view
        cy.get('#backToOverviewArrow').click()

        // go back to the homepage
        cy.get('#left-arrow').click()



    })
})