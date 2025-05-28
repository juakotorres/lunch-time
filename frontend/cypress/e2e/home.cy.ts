describe('Home Page', () => {
  it('correctly loads left panel and map', () => {
    cy.visit('/');
    cy.dataCy('home-page')
      .should('be.visible')
      .within(() => {
        cy.dataCy('left-panel')
          .should('be.visible')
          .within(() => {
            cy.dataCy('logo-icon').should('be.visible');
          });
        cy.dataCy('map-container').should('be.visible');
      });
  });
});
