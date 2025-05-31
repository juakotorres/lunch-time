export interface PlaceSearchResponse {
  places: PlaceSearchResult[];
}

export interface PlaceSearchResult {
  name?: string;
  id: string;
  displayName: LocalizedText;
  types?: string[];
  formattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  userRatingCount: number;
  reviews?: PlaceReview[];
  photos?: PlacePhoto[];
}

interface PlaceReview {
  name: string;
  text: LocalizedText;
  rating: number;
  authorAttribution: {
    displayName: string;
    photoUri: string;
  };
}

interface LocalizedText {
  text: string;
  languageCode: string;
}
interface PlacePhoto {
  name: string;
  flagContentUri: string;
  googleMapsUri: string;
}
