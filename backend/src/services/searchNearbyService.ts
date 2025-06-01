import { PlaceSearchResponse } from '../utils/places';
import { API_KEY } from '../config/env';
import { fetch } from '../utils/fetch';
import { getRandomOffsetLocation } from '../utils/getRandomOffset';
import { AppError } from '../middleware/errorHandler';

const PLACES_API_NEARBY = 'https://places.googleapis.com/v1/places:searchNearby';

export async function fetchNearbyPlaces(
  latitude: string,
  longitude: string,
  type = 'restaurant',
  radius = 1000,
  limit = 20
): Promise<PlaceSearchResponse> {
  const { latitude: randomLatitude, longitude: randomLongitude } = getRandomOffsetLocation(
    parseFloat(latitude),
    parseFloat(longitude),
    radius
  );

  const body = {
    locationRestriction: {
      circle: {
        center: {
          latitude: randomLatitude,
          longitude: randomLongitude,
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
        'places.displayName,places.id,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.googleMapsUri',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new AppError(`Place API error: ${response.statusText}`, 500);
  }

  const data = (await response.json()) as PlaceSearchResponse;
  return data;
}
