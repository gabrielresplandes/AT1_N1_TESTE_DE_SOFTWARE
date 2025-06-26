Cypress.Commands.add('login', (username, password) => {
    cy.visit('https://www.saucedemo.com/v1/');
    cy.get('[data-test=username]').type(username);
    cy.get('[data-test=password]').type(password);
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
});