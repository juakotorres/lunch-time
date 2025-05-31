import { Factory } from 'fishery';
import { Business, YelpSearchResponse } from '../../src/api/yelp';
import { STARTING_LOCATION } from '../../src/constants/location';
import businessFactory from './business';

// To define partial params object
interface YelpSearchResponseParams {
  businesses?: Business[];
}

const yelpSearchResponseFactory = Factory.define<
  YelpSearchResponse,
  undefined,
  YelpSearchResponse,
  YelpSearchResponseParams
>(({ params }) => {
  const businesses = params.businesses ?? businessFactory.buildList(10);

  return {
    total: businesses.length,
    businesses,
    region: {
      center: {
        latitude: STARTING_LOCATION.lat,
        longitude: STARTING_LOCATION.lng,
      },
    },
  };
});

export default yelpSearchResponseFactory;
