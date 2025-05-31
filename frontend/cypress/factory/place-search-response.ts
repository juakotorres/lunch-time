import { Factory } from 'fishery';

import placeSearchResultFactory from './place-search-result';
import { PlaceSearchResult, PlaceSearchResponse } from '../../src/api/places';

// To define partial params object
interface PlaceSearchResponseParams {
  places?: PlaceSearchResult[];
}

const placeSearchResponseFactory = Factory.define<
  PlaceSearchResponse,
  undefined,
  PlaceSearchResponse,
  PlaceSearchResponseParams
>(({ params }) => {
  const places = params.places ?? placeSearchResultFactory.buildList(10);

  return {
    places,
  };
});

export default placeSearchResponseFactory;
