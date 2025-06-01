import { useQuery } from '@tanstack/react-query';
import StarRating from '../StarRating/StarRating';
import './PlaceDetails.css';
import { fetchPlaceDetails } from '../../../api/search';
import googleMapsButton from '../../../assets/google-maps.png';
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

  const handleClickGoogleMaps = () => {
    if (!place) return;
    window.open(place.googleMapsUri, '_blank');
  };

  return (
    <>
      {isLoading && <p>Loading place details...</p>}
      {isError && <p>Error requesting place details: {String(error)}</p>}
      {loadedData && (
        <div className="place-details" data-cy="place-details">
          {place.photos && <PlaceImage photoRoute={place.photos[0].name} />}
          <div className="place-details-menu">
            <div className="place-details-metadata">
              <span className="place-name">{place.displayName.text}</span>
              <span className="place-address">{place.formattedAddress}</span>
              <StarRating rating={place.rating} count={place.userRatingCount} />
            </div>
            <div className="google-maps-button-container">
              <img
                className="google-maps-button"
                src={googleMapsButton}
                alt="Go to Google maps"
                onClick={handleClickGoogleMaps}
              />
            </div>
          </div>
          <Tabs photos={place.photos?.slice(1)} reviews={place.reviews} />
        </div>
      )}
    </>
  );
}
