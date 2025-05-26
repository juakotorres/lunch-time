describe('Home Page', () => {
  it('shows the main page icon', () => {
    cy.visit('/');
    cy.dataCy('logo-icon').should('be.visible');
  });
});
