describe('page renders', function () {
    it('renders the main sections', function () {
        cy.visit('/');

        // header stuff
        cy.get('[data-test=login-button]');

        // content area
        cy.contains('Say goodbye');
        cy.get('[data-test=url-shorten-button]');
        cy.get('[data-test=url-shorten-input]');

        // footer area
        cy.get('[data-test=footer-tcs]');
        cy.contains('wholly owned subsidiary');
    });
});
