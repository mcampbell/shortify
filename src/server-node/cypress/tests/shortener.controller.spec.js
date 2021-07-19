/// <reference types="cypress" />

describe('shortener controller tests', function () {
    it('returns an error on missing input', function () {
        cy.request({
            log: true,
            url: `/shorten`,
            method: 'POST',
            failOnStatusCode: false,
        }).as('query');

        cy.get('@query').its('status').should('equal', 400);
    });
});
