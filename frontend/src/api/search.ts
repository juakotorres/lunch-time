import { PlacePhotoMediaResponse, PlaceSearchResponse, PlaceSearchResult } from './places';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:3001';

export interface LatLng {
  lat: number;
  lng: number;
}

export async function searchPlaces(
  location: LatLng,
  query?: string,
  type: string = 'restaurant',
  radius: number = 1000
): Promise<PlaceSearchResponse> {
  const queryParams = new URLSearchParams({
    lat: location.lat.toString(),
    lng: location.lng.toString(),
    type,
    radius: radius.toString(),
  });

  if (query) queryParams.append('query', query);

  const response = await fetch(`${BACKEND_URL}/places?${queryParams}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Backend API error');
  }

  const data: PlaceSearchResponse = await response.json();
  return data;
}

export async function fetchPlaceDetails(placeId: string): Promise<PlaceSearchResult> {
  const response = await fetch(`${BACKEND_URL}/places/${placeId}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Backend API error');
  }

  const data: PlaceSearchResult = await response.json();
  return data;
}

export async function fetchPlacePhoto(photoRoute: string): Promise<PlacePhotoMediaResponse> {
  const response = await fetch(`${BACKEND_URL}/${photoRoute}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Backend API error');
  }

  const data: PlacePhotoMediaResponse = await response.json();
  return data;
}
