import { PlaceSearchResponse } from '../utils/places';
import { API_KEY } from '../config/env';
import { fetch } from '../utils/fetch';

const PLACES_API_NEARBY = 'https://places.googleapis.com/v1/places:searchNearby';

export async function fetchNearbyPlaces(
  latitude: string,
  longitude: string,
  type = 'restaurant',
  radius = 1000,
  limit = 10
): Promise<PlaceSearchResponse> {
  const body = {
    locationRestriction: {
      circle: {
        center: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
        radius: radius,
      },
    },
    includedPrimaryTypes: [type],
    maxResultCount: limit,
  };

  const response = await fetch(PLACES_API_NEARBY, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask':
        'places.displayName,places.id,places.formattedAddress,places.location,places.rating,places.userRatingCount',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Place API error: ${response.statusText}`);
  }

  const data = (await response.json()) as PlaceSearchResponse;
  return data;
}
