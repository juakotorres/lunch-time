import placeSearchResponseFactory from 'factory/place-search-response';
import placeSearchResultFactory from 'factory/place-search-result';
import placeReviewFactory from 'factory/place-review';
import placePhotoFactory from 'factory/place-photo';
import placePhotoMediaResponseFactory from 'factory/place-photo-media-response';
import { mockFetchPlaceDetails, mockPlaceSearch } from 'intercepts/places';
import { mockReviewAvatar } from 'intercepts/reviews';
import { mockPlacePhoto, mockPlacePhotoMedia } from 'intercepts/photos';
import { LEAFLET_MARKER_CLASS_PATTERN } from 'support/leaftlet';

describe('Place Details', () => {
  const PLACE_SEARCH_RESULTS = placeSearchResultFactory.buildList(20);
  const PLACE_SEARCH_RESPONSE = placeSearchResponseFactory.build({ places: PLACE_SEARCH_RESULTS });
  beforeEach(() => {
    mockPlaceSearch(PLACE_SEARCH_RESPONSE);
    cy.visit('/');
    cy.wait('@getAllPlaces');
  });

  it('shows details of a restaurant', () => {
    const loadedDetails = {
      ...PLACE_SEARCH_RESULTS[0],
      reviews: placeReviewFactory.buildList(5),
      photos: placePhotoFactory.buildList(5, { placeId: PLACE_SEARCH_RESULTS[0].id }),
    };

    // Mock restaurant photos
    loadedDetails.photos.forEach((photo) => {
      const photoMediaResponse = placePhotoMediaResponseFactory.build();
      mockPlacePhoto(photo.name, photoMediaResponse);
      mockPlacePhotoMedia(photoMediaResponse.photoUri);
    });

    // Mock restaurant reviews
    loadedDetails.reviews.forEach((review) => {
      mockReviewAvatar(review.authorAttribution.photoUri);
    });
    mockFetchPlaceDetails(loadedDetails.id, loadedDetails);
    cy.dataCy('place-card').eq(0).click();
    cy.wait('@getPlaceDetails');

    cy.get(LEAFLET_MARKER_CLASS_PATTERN)
      .eq(1)
      .should('have.attr', 'src')
      .then((src) => {
        expect(src).to.include('selected-location');
      });

    cy.dataCy('place-details').should('be.visible');
    cy.dataCy('photo-tab').should('have.class', 'active');
    cy.dataCy('review-tab').should('not.have.class', 'active');

    cy.dataCy('photo-gallery')
      .should('be.visible')
      .within(() => {
        // Wait for images to load.
        cy.wait('@getPlacePhoto');
        cy.dataCy('place-image').should('have.length', 4);
      });
    cy.dataCy('review-list').should('not.exist');

    cy.dataCy('review-tab').click();
    cy.dataCy('photo-gallery').should('not.exist');
    cy.dataCy('review-list')
      .should('be.visible')
      .within(() => {
        cy.dataCy('review-item').should('have.length', 5);
      });

    cy.dataCy('back-arrow').click();
    cy.dataCy('place-details').should('not.exist');

    cy.dataCy('left-panel')
      .should('be.visible')
      .within(() => {
        cy.dataCy('logo-icon').should('be.visible');
        cy.dataCy('place-card').should('have.length', 20);
      });
  });
});
