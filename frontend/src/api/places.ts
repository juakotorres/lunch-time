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
  nationalPhoneNumber?: string;
  reviews?: PlaceReview[];
  photos?: PlacePhoto[];
}

export interface PlacePhotoMediaResponse {
  name: string;
  photoUri: string;
}

export interface PlaceReview {
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

export interface PlacePhoto {
  name: string;
  flagContentUri: string;
  googleMapsUri: string;
  authorAttributions: {
    displayName: string;
    photoUri: string;
    uri: string;
  }[];
}
