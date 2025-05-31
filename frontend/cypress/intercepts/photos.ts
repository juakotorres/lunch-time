import { PlacePhotoMediaResponse } from '../../src/api/places';

export function mockPlacePhoto(urlPath: string, photoMediaResponse: PlacePhotoMediaResponse) {
  cy.intercept(`${Cypress.env('BACKEND_URL')}/${urlPath}`, photoMediaResponse).as('getPlacePhoto');
}

export function mockPlacePhotoMedia(photoUri: string) {
  cy.intercept(photoUri, { fixture: 'photo_example.jpg' });
}
