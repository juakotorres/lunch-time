import placeSearchResponseFactory from 'factory/place-search-response';
import placeSearchResultFactory from '../factory/place-search-result';
import { mockPlaceSearch, mockPlaceSearchError } from 'intercepts/places';

describe('Home Page', () => {
  const PLACE_SEARCH_RESULTS = placeSearchResultFactory.buildList(20);
  const PLACE_SEARCH_RESPONSE = placeSearchResponseFactory.build({ places: PLACE_SEARCH_RESULTS });
  // In case leaflet updates and change the class we can update it from here.
  const LEAFLET_MARKER_CLASS_PATTERN = '*[class^="leaflet-marker-icon"]';

  context('fetch successfully', () => {
    beforeEach(() => {
      mockPlaceSearch(PLACE_SEARCH_RESPONSE);
      cy.visit('/');
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
      // Due to the randomness of the location pin some can overlap. We use the force to click it even if it overlaps.
      cy.get(LEAFLET_MARKER_CLASS_PATTERN).eq(0).click({ force: true });
      cy.dataCy('map-container').within(() => {
        cy.contains(`${PLACE_SEARCH_RESULTS[0].displayName.text}`).should('be.visible');
      });
    });

    it('typing on the search input loads filtered locations', () => {
      const searchFilterResults = {
        places: placeSearchResultFactory.buildList(5).map((place) => {
          place.displayName.text = `Restaurant 1 ${place.id}`;
          return place;
        }),
      };
      mockPlaceSearch(searchFilterResults);
      cy.dataCy('search-input').type('Restaurant 1', { delay: 0 });
      cy.dataCy('place-card').should('have.length', 5);

      cy.get(LEAFLET_MARKER_CLASS_PATTERN).eq(0).click({ force: true });
      cy.dataCy('map-container').within(() => {
        cy.contains(`${searchFilterResults.places[0].displayName.text}`).should('be.visible');
      });
    });

    it('rating should be filled from left to right', () => {
      const searchFilterResults = {
        places: [
          { ...placeSearchResultFactory.build(), rating: 1 },
          { ...placeSearchResultFactory.build(), rating: 2.5 },
          { ...placeSearchResultFactory.build(), rating: 5 },
        ],
      };
      mockPlaceSearch(searchFilterResults);
      cy.dataCy('search-input').type('Restaurant 1', { delay: 0 });
      cy.wait('@getAllPlaces');

      cy.dataCy('place-card')
        .eq(0)
        .within(() => {
          cy.dataCy('start-rating-img').should('have.length', 5);
          cy.dataCy('start-rating-img')
            .eq(0)
            .should('have.attr', 'src')
            .then((src) => {
              expect(src).to.include('filled-star');
            });
          cy.dataCy('start-rating-img')
            .eq(2)
            .should('have.attr', 'src')
            .then((src) => {
              expect(src).to.include('unfilled-star');
            });
        });

      // Check half star is not included
      cy.dataCy('place-card')
        .eq(1)
        .within(() => {
          cy.dataCy('start-rating-img').should('have.length', 5);
          cy.dataCy('start-rating-img')
            .eq(0)
            .should('have.attr', 'src')
            .then((src) => {
              expect(src).to.include('filled-star');
            });
          cy.dataCy('start-rating-img')
            .eq(1)
            .should('have.attr', 'src')
            .then((src) => {
              expect(src).to.not.include('unfilled-star');
              expect(src).to.include('filled-star');
            });
          cy.dataCy('start-rating-img')
            .eq(2)
            .should('have.attr', 'src')
            .then((src) => {
              expect(src).to.include('unfilled-star');
            });
        });
    });
  });

  it('shows error message if error happens', () => {
    mockPlaceSearchError();
    cy.visit('/');

    // useQuery retries 4 times before showing error.
    cy.wait('@getPlacesError');
    cy.wait('@getPlacesError');
    cy.wait('@getPlacesError');
    cy.wait('@getPlacesError');

    cy.dataCy('left-panel').within(() => {
      cy.contains('Error requesting places: Error: Backend API error');
    });
  });
});
