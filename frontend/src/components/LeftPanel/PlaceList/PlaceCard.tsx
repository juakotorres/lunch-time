import { PlaceSearchResult } from '../../../api/places';
import { useSelectedPlace } from '../../../contexts/SelectedLocationContext';
import StarRating from '../StarRating/StarRating';

import './PlaceCard.css';

interface PlaceCardProps {
  place: PlaceSearchResult;
}

export default function PlaceCard({ place }: PlaceCardProps) {
  const { setSelectedPlace } = useSelectedPlace();
  return (
    <div className="place-card" data-cy="place-card" onClick={() => setSelectedPlace(place)}>
      <span className="place-name">{place.displayName.text}</span>
      <span className="place-address">{place.formattedAddress}</span>
      <StarRating rating={place.rating} count={place.userRatingCount} />
      <div className="place-card-divider" />
    </div>
  );
}
