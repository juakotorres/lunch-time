import { Factory } from 'fishery';
import { PlacePhoto } from '../../src/api/places';

interface PlacePhotoParams {
  placeId?: string;
}

const placePhotoFactory = Factory.define<PlacePhoto, undefined, PlacePhoto, PlacePhotoParams>(
  ({ params, sequence }) => {
    const name = params.placeId
      ? `places/${params.placeId}/photos/${sequence}`
      : `name_${sequence}`;

    return {
      name,
      flagContentUri: `flag_content_${sequence}`,
      googleMapsUri: `google_map_uri_${sequence}`,
      authorAttributions: [
        {
          displayName: `author_name_${sequence}`,
          photoUri: `author_avatar_${sequence}`,
          uri: `uri_${sequence}`,
        },
      ],
    };
  }
);

export default placePhotoFactory;
