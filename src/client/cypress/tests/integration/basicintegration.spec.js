/// <reference types="cypress" />

/**
 * Basic functionality.  This does assume the app AND THE SERVER is running.  No interceptions are happening.
 */

describe('basic app functionality', function () {
    it('shortens a long url with button click', function () {
        cy.visit('/');
        cy.get('[data-test=url-shorten-input]').type('https://stord.com');
        cy.get('[data-test=url-shorten-button]').click();
        cy.get('[data-test=url-shorten-input]')
            .invoke('val')
            .should('equal', 'http://localhost:5001/aaaaaa');
    });

    it('shortens a long url with enter key', function () {
        cy.visit('/');
        cy.get('[data-test=url-shorten-input]').type('https://stord.com{enter}');
        cy.get('[data-test=url-shorten-input]')
            .invoke('val')
            .should('equal', 'http://localhost:5001/aaaaaa');
    });

    it('can copy the data to the clipboard with a click', function () {
        cy.visit('/');
        cy.get('[data-test=url-shorten-input]').type('https://stord.com');
        cy.get('[data-test=url-shorten-button]').click();

        // This "get" also tests that we transition to "copy" mode since the button won't exist unless we do.
        cy.get('[data-test=url-copy-button]').click();
        cy.contains('Copied');
        cy.get('[data-test=url-shorten-input]')
            .invoke('val')
            .should('equal', '');
        cy.task('getClipboard').should('equal', 'http://localhost:5001/aaaaaa');
    });

    it('does not copy the data to the clipboard with enter', function () {
        cy.visit('/');
        cy.get('[data-test=url-shorten-input]').type('https://stord.com');
        cy.get('[data-test=url-shorten-button]').click();
        cy.get('[data-test=url-shorten-input]').type('{enter}');
        cy.get('[data-test=url-shorten-input]')
            .invoke('val')
            .should('equal', 'http://localhost:5001/aaaaaa');
        cy.contains('Success');  // If the copy went through, this would have changed to "Copied"

    });

    it('transitions to "shorten" mode after copying', function () {
        cy.visit('/');
        cy.get('[data-test=url-shorten-input]').type('https://stord.com');
        cy.get('[data-test=url-shorten-button]').click();
        cy.get('[data-test=url-copy-button]').click();
        cy.contains('Copied');
        cy.get('[data-test=url-shorten-input]');
    });

});