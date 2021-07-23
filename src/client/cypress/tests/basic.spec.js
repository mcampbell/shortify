/// <reference types="cypress" />

/**
 * Basic functionality.  This does assume the app is running, but not necessarily
 * the server side.  (Calls will be intercepted/mocked.)
 */

describe('basic app functionality', function () {
    it('shortens a long url', function () {
        cy.intercept(
            {
                method: 'POST', url: '**/shorten'
            },
            {
                statusCode: 200,
                body: '{"status":"success","data":{"status":"ok","result":"aaaaaa"}}'
            });
        cy.visit('/');
    });
});