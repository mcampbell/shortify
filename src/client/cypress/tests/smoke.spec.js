describe('basic app running functionality', function () {
    it('comes up ok', function () {
        cy.visit('/');
        cy.contains('Header');
        cy.contains('Content');
        cy.contains('Footer');
    });
});