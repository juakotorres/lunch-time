import './StarRating.css';
import unfilledStar from '../../../assets/unfilled-star.png';
import filledStar from '../../../assets/filled-star.png';

interface StarRatingProps {
  rating: number;
  count?: number;
  hideNumber?: boolean;
}

export default function StarRating({ rating, count, hideNumber }: StarRatingProps) {
  return (
    <div className="star-rating">
      {!hideNumber && <strong>{rating}</strong>}
      {Array.from({ length: 5 }).map((_, index) => (
        <img
          key={index}
          className="star-rating-icon"
          data-cy="start-rating-img"
          src={index + 1 <= rating ? filledStar : unfilledStar}
          alt="rating-star"
        />
      ))}
      {count && <strong>({count})</strong>}
    </div>
  );
}
