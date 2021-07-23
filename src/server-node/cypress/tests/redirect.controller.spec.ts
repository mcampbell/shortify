/// <reference types="cypress" />

describe('redirect controller tests', function () {
    it('returns an error on a non-expandable short', function () {
        cy.request({
            log: true,
            url: `/foobarbaz`,
            method: 'GET',
            failOnStatusCode: false,
        }).as('query');

        cy.get('@query').its('status').should('equal', 404);
        cy.get('@query')
            .its('body')
            .should('deep.equal', {
                errors: [
                    {
                        detail: 'No expansion of foobarbaz can be found.',
                        status: '404',
                    },
                ],
            });
    });

    it('returns a redirect on an expandable short', function () {
        cy.request({
            log: true,
            url: `/aaaaaa`,
            method: 'GET',
            failOnStatusCode: false,
        }).as('query');

        cy.get('@query').its('redirects')
            .should('include', "302: https://stord.com/");
    });

});
