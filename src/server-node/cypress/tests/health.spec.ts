/// <reference types="cypress" />

describe('health tests', function () {
    it('runs the health check successfully', function () {
        cy.request({
            log: true,
            url: `/health`,
            method: 'GET',
        }).as('query');

        cy.get('@query').its('status').should('equal', 200);
        cy.get('@query')
            .its('body')
            .should('deep.equal', { app: 'ok', db: 'ok' });
    });
});
