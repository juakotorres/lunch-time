import { Factory } from 'fishery';
import { PlaceReview } from '../../src/api/places';

const placeReviewFactory = Factory.define<PlaceReview>(({ sequence }) => ({
  name: `name_${sequence}`,
  text: {
    text: `review_text_${sequence}`,
    languageCode: 'en',
  },
  rating: 3.2,
  authorAttribution: {
    displayName: `author_name_${sequence}`,
    photoUri: `avatar_url_${sequence}`,
  },
}));

export default placeReviewFactory;
