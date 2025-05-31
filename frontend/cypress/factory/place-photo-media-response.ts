import { Factory } from 'fishery';
import { PlacePhotoMediaResponse } from '../../src/api/places';

const placePhotoMediaResponseFactory = Factory.define<PlacePhotoMediaResponse>(({ sequence }) => ({
  name: `name_${sequence}`,
  photoUri: `photo_uri_fixture_${sequence}`,
}));

export default placePhotoMediaResponseFactory;
