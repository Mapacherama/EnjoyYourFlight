/**
 * @author Noah Visser
 */

/*
    Electron seems to give some weird results (like not being able to load the manageUser page)
    So this test should be performed in chrome.
    Executing the test from the command line can be done with:
    npx cypress run --browser chrome --spec "./cypress/integration/pad/offline/*"

    (Provided you're terminal is located at /server/)
 */

let users = [];
let password;
let searchQueries = [];

describe("Manage Users", () => {

    beforeEach(() => {
        cy.server();

        cy.route({
            method: 'POST',
            url: '**/admin/isAdmin',
            response: true
        }).as("isAdmin");

        cy.route({
            method: 'POST',
            url: '**/stats/visit',
            response: true
        }).as("visit");

        cy.route({
            method: 'POST',
            url: '**/admin/users',
            response: users
        }).as("users");
    });

    it("Retrieve test data", () => {
            cy.fixture("manageUser")
                .then((json) => {
                    // let o = JSON.parse(json);
                    users = json["users"];
                    password = json["password test"];
                    searchQueries = json["search queries"];
                }).as("manageUserData");

            cy.get("@manageUserData").should("have.property", "users");
        }
    );

    it("Login", () => {
        cy.route({
            method: 'POST',
            url: '**/user/login',
            response: {"seat_number": "ADMIN"}
        }).as("login");

        cy.login('ADMIN', 'test');
        cy.get(".home-wrapper-1").should("exist");
    });

    it("Visit page", () => {
        cy.wait(100);
        cy.visit(`#manageUser`);
        reloadWithCheck()
    });

    it("Manage users properly renders users", () => {
        cy.get('.manage-user-list').find('.manage-block').should('have.length', users.length);
    });

    describe("Edit function", () => {

        it("Overlay works", () => {
            cy.get(".manage-block").each((element) => {
                if (element.find(".manage-blocked-text").length < 1) {
                    cy.get(element).find(".editButton").click().as("Open overlay");
                    cy.get(".manage-dialogue-box").should("be.visible").as("Overlay opened");
                    cy.get(".fas").click().as("Close overlay");
                }
            }).as("Get all user elements");
            cy.get(".manage-dialogue-box").should("not.be.visible").as("Overlay closed");
        });

        it("Form is filled in with seat number", () => {
            cy.get(".manage-block").each((element) => {
                if (element.find(".manage-blocked-text").length !== 1) {
                    let seat = element.find("h1").html();
                    let inputVal;
                    cy.get(element).find(".editButton").click().as("Open overlay");
                    cy.wait(50, {"log": false}).then(() => {
                        inputVal = Cypress.$("#seatNumber").val();
                    });
                    cy.wait(50, {"log": false}).then(() => expect(inputVal).to.equal(seat)).as("Seat number placed in form");
                    cy.get(".fas").click().as("Close overlay");
                }
            }).as("Get all user elements");
        });

        it("Changing seat number works", () => {
            cy.route({
                method: 'POST',
                url: '**/admin/updateName',
                response: [false]
            }).as("updateName");
            reloadWithCheck();

            let totalLength = Cypress.$(".manage-block").length;
            for (let i = 0; i < totalLength; i++) {
                if (Cypress.$(".manage-block").eq(i).find(".manage-blocked-text").length !== 1) {
                    let seat = Cypress.$(".manage-block").eq(i).find("h1").html();
                    cy.get(".manage-block").eq(i).find(".editButton").click().as("Open overlay");
                    cy.get(".manage-dialogue-box").should("be.visible").as("Overlay opened");
                    let randomValue = Math.random();
                    cy.get("#seatNumber").clear().type(`${randomValue}`);
                    cy.get("#manage-seat-change").find("button").click();
                    cy.wait("@updateName").then((xhr) => {
                        expect(xhr.request.body.newSeat).to.equal(`${randomValue}`);
                        expect(xhr.request.body.oldSeat).to.equal(seat);
                    });
                }
            }
        });

        it("Changing password works", () => {
            cy.route({
                method: 'POST',
                url: '**/admin/updatePassword',
                response: [false]
            }).as("updatePassword");
            reloadWithCheck();

            let totalLength = Cypress.$(".manage-block").length;
            for (let i = 0; i < totalLength; i++) {
                if (Cypress.$(".manage-block").eq(i).find(".manage-blocked-text").length !== 1) {
                    reloadWithCheck();
                    let seat = Cypress.$(".manage-block").eq(i).find("h1").html();
                    cy.get(".manage-block").eq(i).find(".editButton").click().as("Open overlay");
                    cy.get(".manage-dialogue-box").should("be.visible").as("Overlay opened");
                    cy.get("#pass").clear().type(`${password}`);
                    cy.get("#confirmPass").clear().type(`${Math.random()}`);
                    cy.get("#manage-password-change").find("button").click();
                    cy.get(".invalid-feedback").should("contain", "Passwords don't match.").as("Proper error display");

                    cy.get("#confirmPass").clear().type(`${password}`);
                    cy.get("#manage-password-change").find("button").click();

                    cy.wait("@updatePassword").then((xhr) => {
                        expect(xhr.request.body.id).to.equal(`${seat}`);
                        expect(xhr.request.body.password).to.equal(`${password}`);
                    });

                }
            }
        });

        it("Deleting users works", () => {
            cy.route({
                method: 'POST',
                url: '**/admin/deleteUser',
                response: [false]
            }).as("deleteUser");
            reloadWithCheck();

            let totalLength = Cypress.$(".manage-block").length;
            for (let i = 0; i < totalLength; i++) {
                if (Cypress.$(".manage-block").eq(i).find(".manage-blocked-text").length !== 1) {
                    let seat = Cypress.$(".manage-block").eq(i).find("h1").html();
                    cy.get(".manage-block").eq(i).find(".editButton").click().as("Open overlay");
                    cy.get(".manage-dialogue-box").should("be.visible").as("Overlay opened");
                    cy.get("#deleteButton").click();
                    cy.wait("@deleteUser").then((xhr) =>
                        expect(xhr.request.body.id).to.equal(`${seat}`)
                    );
                }
            }
        });
    });

    describe("Block function", () => {

        it("Blocking and unblocking users works", () => {
            cy.route({
                method: 'POST',
                url: '**/admin/blockUser',
                response: [false]
            }).as("blockUser");

            reloadWithCheck();

            let totalLength = Cypress.$(".manage-block").length;
            for (let i = 0; i < totalLength; i++) {
                let seat = Cypress.$(".manage-block").eq(i).find("h1").html();
                cy.get(".manage-block").eq(i).find(".blockButton").click();
                cy.wait("@blockUser").then((xhr) => {
                    expect(xhr.request.body.seat).to.equal(`${seat}`);
                    expect(xhr.request.body.blockState).to.equal(Cypress.$(".manage-block").eq(i).find(".manage-blocked-text").length !== 1);
                });
            }
        });

        it("(Block- and unblock buttons are properly displayed", () => {
            let totalLength = Cypress.$(".manage-block").length;
            for (let i = 0; i < totalLength; i++) {
                if (Cypress.$(".manage-block").eq(i).find(".manage-blocked-text").length === 1)
                    cy.get(".manage-block").eq(i).find(".blockButton").should("contain", "Unblock").and("to.not.have.class", "btn-primary");
                else cy.get(".manage-block").eq(i).find(".blockButton").should("contain", "Block").and("to.have.class", "btn-primary");
            }
        });
    });

    it("Search function works", () => {
        function loop(search) {
            cy.get("#searchUsers").clear().type(search);
            let totalLength = Cypress.$(".manage-block").length;
            for (let i = 0; i < totalLength; i++) {
                let seat = Cypress.$(".manage-block").eq(i).find("h1").html();
                let re = new RegExp(`.*${search.toLocaleUpperCase()}.*`, "g");
                if (seat.match(re)) cy.get(".manage-block").eq(i).should("be.visible");
                else cy.get(".manage-block").eq(i).should("not.be.visible");
            }
        }

        for (let i = 0; i < searchQueries.length; i++) loop(searchQueries[i]);
        cy.get("#searchUsers").clear();
    });
});

function reloadWithCheck() {
    cy.reload();
    cy.get(".manage-nav").should("exist");
}