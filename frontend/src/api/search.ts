import { YelpSearchResponse } from './yelp';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:3001';

export interface LatLng {
  lat: number;
  lng: number;
}

export async function searchPlaces(
  location: LatLng,
  query: string = 'restaurant',
  radius: number = 1000,
  limit: number = 10
): Promise<YelpSearchResponse> {
  const queryParams = new URLSearchParams({
    lat: location.lat.toString(),
    lng: location.lng.toString(),
    term: query,
    radius: radius.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(`${BACKEND_URL}/places?${queryParams}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Backend API error');
  }

  const data: YelpSearchResponse = await response.json();
  return data;
}
