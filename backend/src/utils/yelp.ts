export interface YelpSearchResponse {
  total: number;
  businesses: Business[];
  region: Region;
}

export interface Business {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: Category[];
  rating: number;
  coordinates: Coordinates;
  transactions: string[];
  price?: string;
  location: Location;
  phone: string;
  display_phone: string;
  distance: number;
}

interface Category {
  alias: string;
  title: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Location {
  address1: string;
  address2: string | null;
  address3: string | null;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
}

interface Region {
  center: Coordinates;
}
