import { Factory } from 'fishery';
import { PlaceSearchResult } from '../../src/utils/places';

const placeSearchResultFactory = Factory.define<PlaceSearchResult>(({ sequence }) => ({
  displayName: {
    text: `name_${sequence}`,
    languageCode: 'en',
  },
  location: {
    latitude: 1,
    longitude: 1,
  },
  id: `id_${sequence}`,
  formattedAddress: `address_${sequence}`,
  rating: 1,
  userRatingCount: 100,
  googleMapsUri: 'google_maps_uri',
}));

export default placeSearchResultFactory;
