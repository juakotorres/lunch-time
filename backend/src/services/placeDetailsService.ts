import { PlaceSearchResponse } from '../utils/places';
import { API_KEY } from '../config/env';
import { fetch } from '../utils/fetch';
import { AppError } from '../middleware/errorHandler';

const PLACE_DETAILS_API = 'https://places.googleapis.com/v1/places';

export async function fetchPlaceDetails(placeId: string): Promise<PlaceSearchResponse> {
  const response = await fetch(`${PLACE_DETAILS_API}/${placeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask':
        'displayName,id,formattedAddress,nationalPhoneNumber,rating,userRatingCount,googleMapsUri,photos.name,reviews.rating,reviews.text,reviews.relativePublishTimeDescription,reviews.authorAttribution.displayName,reviews.authorAttribution.photoUri',
    },
  });

  if (!response.ok) {
    throw new AppError(`Place API error: ${response.statusText}`, 500);
  }

  const data = (await response.json()) as PlaceSearchResponse;
  return data;
}
