import { Factory } from 'fishery';
import { Business, YelpSearchResponse } from '../../src/utils/yelp';
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
        latitude: 1,
        longitude: 1,
      },
    },
  };
});

export default yelpSearchResponseFactory;
