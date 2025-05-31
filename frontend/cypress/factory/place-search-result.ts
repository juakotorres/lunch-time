import { Factory } from 'fishery';
import { PlaceSearchResult } from '../../src/api/places';
import { STARTING_LOCATION } from '../../src/constants/location';
import { randomizeLocationAround } from 'support/randomize-location-around';

const placeSearchResultFactory = Factory.define<PlaceSearchResult>(({ sequence }) => ({
  displayName: {
    text: `name_${sequence}`,
    languageCode: 'en',
  },
  location: randomizeLocationAround(STARTING_LOCATION.lat, STARTING_LOCATION.lng),
  id: `id_${sequence}`,
  formattedAddress: `address_${sequence}`,
  rating: 1,
  userRatingCount: 100,
}));

export default placeSearchResultFactory;
