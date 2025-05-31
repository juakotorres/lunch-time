import { PlaceSearchResponse } from '../../../api/places';
import PlaceCard from './PlaceCard';
import './PlaceList.css';
import SearchInput from './SearchInput';

interface PlaceListProps {
  placeSearchResponse?: PlaceSearchResponse;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function PlaceList({ placeSearchResponse, isLoading, isError, error }: PlaceListProps) {
  const noPlacesFound =
    !placeSearchResponse || !placeSearchResponse.places || placeSearchResponse.places.length === 0;

  const canShowData = !isLoading && !isError && !noPlacesFound;
  return (
    <div className="place-list">
      <SearchInput />
      {isLoading && <p>Loading places...</p>}
      {isError && <p>Error requesting places: {String(error)}</p>}
      {!isLoading && !isError && noPlacesFound && <p>No places found.</p>}
      {canShowData &&
        placeSearchResponse?.places.map((place) => <PlaceCard key={place.id} place={place} />)}
    </div>
  );
}
