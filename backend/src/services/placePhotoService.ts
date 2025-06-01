import { PlacePhotoMediaResponse } from '../utils/places';
import { API_KEY } from '../config/env';
import { fetch } from '../utils/fetch';
import { AppError } from '../middleware/errorHandler';

const PLACE_DETAILS_API = 'https://places.googleapis.com/v1/places';

const IMAGE_MAX_WIDTH_PX = 500;

export async function fetchPlacePhoto(
  placeId: string,
  photoId: string
): Promise<PlacePhotoMediaResponse> {
  const response = await fetch(
    `${PLACE_DETAILS_API}/${placeId}/photos/${photoId}/media?maxWidthPx=${IMAGE_MAX_WIDTH_PX}&skipHttpRedirect=true`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new AppError(`Place Photos API error: ${response.statusText}`, 500);
  }

  const data = (await response.json()) as PlacePhotoMediaResponse;
  return data;
}
