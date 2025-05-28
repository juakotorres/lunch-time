import { useQuery } from '@tanstack/react-query';
import { searchPlaces, LatLng } from '../api/search';

interface UsePlacesSearchParams {
  location: LatLng;
}

export function usePlacesSearch({ location }: UsePlacesSearchParams) {
  const latlng = `${location.lat},${location.lng}`;

  return useQuery({
    queryKey: ['places', latlng],
    queryFn: () => searchPlaces(location),
    enabled: !!location.lat && !!location.lng,
  });
}
