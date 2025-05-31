import { useQuery } from '@tanstack/react-query';
import { searchPlaces, LatLng } from '../api/search';

interface UsePlacesSearchParams {
  location: LatLng;
  query: string;
}

export function usePlacesSearch({ location, query }: UsePlacesSearchParams) {
  const latlng = `${location.lat},${location.lng}`;

  return useQuery({
    queryKey: ['places', latlng, query],
    queryFn: () => searchPlaces(location, query),
    enabled: !!location.lat && !!location.lng,
  });
}
