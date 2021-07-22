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

    it('returns an error on a bad url', function () {
        cy.request({
            log: true,
            url: `/shorten`,
            body: { url: 'google.com' },
            method: 'POST',
            failOnStatusCode: false,
        }).as('query');

        cy.get('@query').its('status').should('equal', 422);
        cy.get('@query').its('body.status').should('equal', 'error');
        cy.get('@query')
            .its('body.data.reason')
            .should(
                'equal',
                'url google.com appears to not be a valid url (Invalid URL)'
            );
    });

    it('returns no error on a good url', function () {
        cy.request({
            log: true,
            url: `/shorten`,
            body: { url: 'https://stord.com' },
            method: 'POST',
            failOnStatusCode: false,
        }).as('query');

        cy.get('@query').its('status').should('equal', 200);
        cy.get('@query')
            .its('body')
            .should('deep.equal', { status: 'success', data: 'aaaaaa' });
    });
});
