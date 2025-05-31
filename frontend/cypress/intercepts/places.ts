import { PlaceSearchResponse, PlaceSearchResult } from '../../src/api/places';

export function mockPlaceSearch(placeSearchResponse: PlaceSearchResponse) {
  cy.intercept(`${Cypress.env('BACKEND_URL')}/places*`, placeSearchResponse).as('getAllPlaces');
}

export function mockPlaceSearchError() {
  cy.intercept(`${Cypress.env('BACKEND_URL')}/places*`, { statusCode: 500 }).as('getPlacesError');
}

export function mockFetchPlaceDetails(placeId: string, placeSearchResult: PlaceSearchResult) {
  cy.intercept(`${Cypress.env('BACKEND_URL')}/places/${placeId}`, placeSearchResult).as(
    'getPlaceDetails'
  );
}
