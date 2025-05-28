import { YelpSearchResponse } from '../../api/yelp';
import './PlaceList.css';

interface PlaceListProps {
  places?: YelpSearchResponse;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function PlaceList({ places, isLoading, isError, error }: PlaceListProps) {
  if (isLoading) {
    return <p>Loading places...</p>;
  }

  if (isError) {
    return <p>Error requesting places: {String(error)}</p>;
  }

  return (
    <div className="place-list">
      {places?.businesses.map((business) => <strong key={business.id}>{business.name}</strong>)}
    </div>
  );
}
