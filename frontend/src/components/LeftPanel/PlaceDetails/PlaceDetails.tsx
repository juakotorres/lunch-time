import { useQuery } from '@tanstack/react-query';
import StarRating from '../StarRating/StarRating';
import './PlaceDetails.css';
import { fetchPlaceDetails } from '../../../api/search';
import PlaceImage from './PlaceImage';
import Tabs from './Tabs';

interface PlaceDetailsProps {
  placeId: string;
}

export default function PlaceDetails({ placeId }: PlaceDetailsProps) {
  const {
    data: place,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['place-details', placeId],
    queryFn: () => fetchPlaceDetails(placeId),
    enabled: !!placeId,
  });

  const loadedData = !isLoading && !isError && place;

  return (
    <>
      {isLoading && <p>Loading place details...</p>}
      {isError && <p>Error requesting place details: {String(error)}</p>}
      {loadedData && (
        <div className="place-details" data-cy="place-details">
          {place.photos && <PlaceImage photoRoute={place.photos[0].name} />}
          <span className="place-name">{place.displayName.text}</span>
          <span className="place-address">{place.formattedAddress}</span>
          <StarRating rating={place.rating} count={place.userRatingCount} />
          <Tabs photos={place.photos?.slice(1)} reviews={place.reviews} />
        </div>
      )}
    </>
  );
}
