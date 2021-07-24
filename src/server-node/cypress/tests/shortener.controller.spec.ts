/// <reference types="cypress" />

describe('shortener controller tests', function () {
    it('returns an error on missing input', function () {
        cy.request({
            log: true,
            url: `/shorten`,
            method: 'POST',
            headers: {
                'Authentication': 'Bearer JWTGOESHERE',
            },
            failOnStatusCode: false,
        }).as('query');

        cy.get('@query').its('status').should('equal', 400);
        cy.get('@query')
            .its('body')
            .should('deep.equal', {
                errors: [
                    {
                        detail: 'missing required body parameter `url`',
                        status: "400",
                    },
                ],
            });
    });

    it('returns an error on a bad url', function () {
        cy.request({
            log: true,
            url: `/shorten`,
            body: { url: 'google.com' },
            method: 'POST',
            headers: {
                'Authentication': 'Bearer JWTGOESHERE',
            },
            failOnStatusCode: false,
        }).as('query');

        cy.get('@query').its('status').should('equal', 422);

        // for #reasons? the detail message on Windows is different, but it begins the same way.
        // Due to a different version of npm causing a different version of JS or that has a different
        // version of URL() in it?
        cy.get('@query')
            .its('body').its('errors').its(0).its('status')
            .should('equal', '422');
        cy.get('@query')
            .its('body').its('errors').its(0).its('detail')
            .should('contain', 'URL [google.com] cannot be shortened. Reason: Invalid URL');
    });

    it('returns no error on a good url', function () {
        cy.request({
            log: true,
            url: `/shorten`,
            body: { url: 'https://stord.com' },
            method: 'POST',
            headers: {
                'Authentication': 'Bearer JWTGOESHERE',
            },
            failOnStatusCode: false,
        }).as('query');

        cy.get('@query').its('status').should('equal', 200);
        cy.get('@query')
            .its('body')
            .should('deep.equal', {
                data: {
                    type: 'short',
                    value: 'aaaaaa',
                },
            });
    });

    it('fails to authenticate without the right header', function () {
        cy.request({
            log: true,
            url: `/shorten`,
            body: { url: 'https://stord.com' },
            method: 'POST',
            failOnStatusCode: false,
        }).as('query');

        cy.get('@query').its('status').should('equal', 401);
        cy.get('@query').its('body').should('not.exist');
    });

    it('fails to authenticate with the right header but bad value', function () {
        cy.request({
            log: true,
            url: `/shorten`,
            body: { url: 'https://stord.com' },
            method: 'POST',
            headers: {
                'Authentication': 'Bearer JWTGOESHERE?',
            },
            failOnStatusCode: false,
        }).as('query');

        cy.get('@query').its('status').should('equal', 401);
        cy.get('@query').its('body').should('not.exist');
    });
});
