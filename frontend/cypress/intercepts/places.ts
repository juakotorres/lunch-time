import { YelpSearchResponse } from '../../src/api/yelp';

export function mockYelpSearch(yelpSearchResponse: YelpSearchResponse) {
  cy.intercept(`${Cypress.env('BACKEND_URL')}/places*`, yelpSearchResponse).as('getAllPlaces');
}
