import { useState } from 'react';
import { PlacePhoto, PlaceReview } from '../../../api/places';

import './Tabs.css';
import PhotoGallery from './PhotoGallery';
import ReviewList from './ReviewList';

interface TabsProps {
  reviews?: PlaceReview[];
  photos?: PlacePhoto[];
}

export default function Tabs({ photos, reviews }: TabsProps) {
  const [tab, setActiveTab] = useState(0);

  return (
    <>
      <div className="tabs">
        <div
          className={`tab ${tab === 0 ? 'active' : ''}`}
          data-cy="photo-tab"
          onClick={() => setActiveTab(0)}
        >
          Photos
        </div>
        <div
          className={`tab ${tab === 1 ? 'active' : ''}`}
          data-cy="review-tab"
          onClick={() => setActiveTab(1)}
        >
          Review
        </div>
      </div>
      {tab === 0 && photos && <PhotoGallery photos={photos} />}
      {tab === 1 && reviews && <ReviewList reviews={reviews} />}
    </>
  );
}
