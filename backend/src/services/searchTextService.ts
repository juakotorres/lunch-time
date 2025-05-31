import { PlaceSearchResponse } from '../utils/places';
import { API_KEY } from '../config/env';
import { fetch } from '../utils/fetch';

const PLACES_API_TEXT_SEARCH = 'https://places.googleapis.com/v1/places:searchText';

export async function fetchPlacesByText(
  latitude: string,
  longitude: string,
  query: string,
  type = 'restaurant',
  radius = 1000,
  limit = 10
): Promise<PlaceSearchResponse> {
  const body = {
    locationBias: {
      circle: {
        center: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
        radius: radius,
      },
    },
    textQuery: query,
    includedType: type,
    maxResultCount: limit,
  };

  const response = await fetch(PLACES_API_TEXT_SEARCH, {
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
