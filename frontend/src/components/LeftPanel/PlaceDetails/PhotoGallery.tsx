import { PlacePhoto } from '../../../api/places';

import './PhotoGallery.css';
import PlaceImage from './PlaceImage';

interface PhotoGalleryProps {
  photos: PlacePhoto[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  return (
    <div className="photo-gallery" data-cy="photo-gallery">
      {photos.map((photo, index) => (
        <PlaceImage key={index} photoRoute={photo.name} />
      ))}
    </div>
  );
}
