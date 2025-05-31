import React from 'react';
import { PlaceReview } from '../../../api/places';
import StarRating from '../StarRating/StarRating';

import './ReviewList.css';

interface ReviewListProps {
  reviews: PlaceReview[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="review-list" data-cy="review-list">
      {reviews.map((review, index) => (
        <div key={index} className="review-item" data-cy="review-item">
          <div className="review-user">
            <img className="user-avatar" src={review.authorAttribution.photoUri} alt="user-photo" />
            <div>{review.authorAttribution.displayName}</div>
          </div>
          <StarRating rating={review.rating} hideNumber />
          <div className="user-review">{review.text.text}</div>
          <div className="review-divider" />
        </div>
      ))}
    </div>
  );
}
