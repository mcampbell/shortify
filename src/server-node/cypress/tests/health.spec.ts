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

    it('handles a bad url with grace', function () {
        cy.request({
            log: true,
            url: `/bad_uri`,
            method: 'POST',
            failOnStatusCode: false,
        }).as('query');
        cy.get('@query').its('status').should('equal', 404);
        cy.get('@query')
            .its('body')
            .should('deep.equal', {
                errors: [
                    {
                        status: '404',
                        detail: 'unknown_endpoint: POST: /bad_uri',
                    },
                ],
            });
    });
});
