import { YelpSearchResponse } from '../utils/yelp';
import { YELP_API_KEY } from '../config/env';
import { fetch } from '../utils/fetch';

const BASE_URL = 'https://api.yelp.com/v3/businesses/search';

export async function fetchYelpPlaces(
  latitude: string,
  longitude: string,
  term = 'restaurant',
  radius = '1000',
  limit = '10'
): Promise<YelpSearchResponse> {
  const params = new URLSearchParams({
    latitude,
    longitude,
    term,
    radius,
    limit,
  });

  const response = await fetch(`${BASE_URL}?${params}`, {
    headers: {
      Authorization: `Bearer ${YELP_API_KEY}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Yelp API error: ${response.statusText}`);
  }

  const data = (await response.json()) as YelpSearchResponse;
  return data;
}
