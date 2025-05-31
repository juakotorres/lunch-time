import yelpSearchResponseFactory from 'factory/yelp-reponse';
import businessFactory from '../factory/business';
import { mockYelpSearch } from 'intercepts/places';

describe('Home Page', () => {
  const BUSINESS_LIST = businessFactory.buildList(20);
  const YELP_SEARCH_RESPONSE = yelpSearchResponseFactory.build({ businesses: BUSINESS_LIST });
  // In case leaflet updates and change the class we can update it from here.
  const LEAFLET_MARKER_CLASS_PATTERN = '*[class^="leaflet-marker-icon"]';

  beforeEach(() => {
    cy.visit('/');
    mockYelpSearch(YELP_SEARCH_RESPONSE);

    cy.wait('@getAllPlaces');
  });

  it('correctly loads left panel and map', () => {
    cy.dataCy('home-page')
      .should('be.visible')
      .within(() => {
        cy.dataCy('left-panel')
          .should('be.visible')
          .within(() => {
            cy.dataCy('logo-icon').should('be.visible');
            cy.dataCy('place-card').should('have.length', 20);
          });
        cy.dataCy('map-container')
          .should('be.visible')
          .within(() => {
            // We cannot add data-cy to leaflet marker, so we get it by class
            cy.get(LEAFLET_MARKER_CLASS_PATTERN).should('have.length', 20);
          });
      });
  });

  it('clicking on a marker shows a tooltip with the information', () => {
    cy.get(LEAFLET_MARKER_CLASS_PATTERN).eq(0).click();
    cy.dataCy('map-container').within(() => {
      cy.contains(`${BUSINESS_LIST[0].name}`).should('be.visible');
    });
  });
});
