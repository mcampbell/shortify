/// <reference types="cypress" />

/**
 * Basic functionality.  This does assume the app is running, but not necessarily
 * the server side.  (Calls will be intercepted/mocked.)
 */

describe('basic app functionality', function () {
    it('shortens a long url with button click', function () {
        cy.intercept(
            {
                method: 'POST', url: '**/shorten'
            },
            {
                statusCode: 200,
                body: '{"data":{"type":"short","value":"aaaaaa"}}'
            }).as('api');

        cy.visit('/');
        cy.get('[data-test=url-shorten-input]').type('https://stord.com');
        cy.get('[data-test=url-shorten-button]').click();
        cy.wait('@api');
        cy.get('[data-test=url-shorten-input]')
            .invoke('val')
            .should('equal', 'http://localhost:5001/aaaaaa');
    });
    it('shortens a long url with enter key', function () {
        cy.intercept(
            {
                method: 'POST', url: '**/shorten'
            },
            {
                statusCode: 200,
                body: '{"data":{"type":"short","value":"aaaaaa"}}'
            }).as('api');

        cy.visit('/');
        cy.get('[data-test=url-shorten-input]').type('https://stord.com{enter}');
        cy.wait('@api');
        cy.get('[data-test=url-shorten-input]')
            .invoke('val')
            .should('equal', 'http://localhost:5001/aaaaaa');
    });

    it('deals with a server error kind of not badly', function () {
        cy.intercept(
            {
                method: 'POST', url: '**/shorten'
            },
            {
                statusCode: 500,
                body: '{"errors":[{"status":"500","detail":"shrug"}]}'
            }).as('api');

        cy.visit('/');
        cy.get('[data-test=url-shorten-input]').type('https://stord.com{enter}');
        cy.wait('@api');
        cy.contains('Unknown server error.');
    });

    it('can copy the data to the clipboard', function () {
        cy.intercept(
            {
                method: 'POST', url: '**/shorten'
            },
            {
                statusCode: 200,
                body: '{"data":{"type":"short","value":"aaaaaa"}}'
            }).as('api');

        cy.visit('/');
        cy.get('[data-test=url-shorten-input]').type('https://stord.com');
        cy.get('[data-test=url-shorten-button]').click();
        cy.wait('@api');

        // This "get" also tests that we transition to "copy" mode since the button won't exist unless we do.
        cy.get('[data-test=url-copy-button]').click();
        cy.contains('Copied');
        cy.get('[data-test=url-shorten-input]')
            .invoke('val')
            .should('equal', '');
        cy.task('getClipboard').should('equal', 'http://localhost:5001/aaaaaa');
    });

    it('transitions to "shorten" mode after copying', function () {
        cy.intercept(
            {
                method: 'POST', url: '**/shorten'
            },
            {
                statusCode: 200,
                body: '{"data":{"type":"short","value":"aaaaaa"}}'
            }).as('api');

        cy.visit('/');
        cy.get('[data-test=url-shorten-input]').type('https://stord.com');
        cy.get('[data-test=url-shorten-button]').click();
        cy.wait('@api');
        cy.get('[data-test=url-copy-button]').click();
        cy.contains('Copied');
        cy.get('[data-test=url-shorten-input]')
    });


});