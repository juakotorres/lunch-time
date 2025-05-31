import { useQuery } from '@tanstack/react-query';
import { fetchPlacePhoto } from '../../../api/search';
import imagePlaceholder from '../../../assets/image_placeholder.png';
import './PlaceImage.css';

interface PlaceImageProps {
  photoRoute: string;
}

export default function PlaceImage({ photoRoute }: PlaceImageProps) {
  const {
    data: photo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['place-photo', photoRoute],
    queryFn: () => fetchPlacePhoto(photoRoute),
    enabled: !!photoRoute,
  });

  const photoLoaded = !isLoading && !isError && photo;

  return (
    <img
      src={photoLoaded ? photo.photoUri : imagePlaceholder}
      alt="Example of the place"
      className="place-image"
      data-cy="place-image"
    />
  );
}
