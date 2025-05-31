import { PlaceSearchResult } from '../../../api/places';
import StarRating from '../StarRating/StarRating';

import './PlaceCard.css';

interface PlaceCardProps {
  place: PlaceSearchResult;
  onSelectedPlace: (placeId: string) => void;
}

export default function PlaceCard({ place, onSelectedPlace }: PlaceCardProps) {
  return (
    <div className="place-card" data-cy="place-card" onClick={() => onSelectedPlace(place.id)}>
      <span className="place-name">{place.displayName.text}</span>
      <span className="place-address">{place.formattedAddress}</span>
      <StarRating rating={place.rating} count={place.userRatingCount} />
      <div className="place-card-divider" />
    </div>
  );
}
