import { PlaceSearchResponse } from '../../src/api/places';

export function mockPlaceSearch(placeSearchResponse: PlaceSearchResponse) {
  cy.intercept(`${Cypress.env('BACKEND_URL')}/places*`, placeSearchResponse).as('getAllPlaces');
}

export function mockPlaceSearchError() {
  cy.intercept(`${Cypress.env('BACKEND_URL')}/places*`, { statusCode: 500 }).as('getPlacesError');
}
