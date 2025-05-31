import './StarRating.css';
import unfilledStar from '../../../assets/unfilled-star.png';
import filledStar from '../../../assets/filled-star.png';

interface StarRatingProps {
  rating: number;
  count: number;
}

export default function StarRating({ rating, count }: StarRatingProps) {
  return (
    <div className="star-rating">
      <strong>{rating}</strong>
      {Array.from({ length: 5 }).map((_, index) => (
        <img
          key={index}
          className="star-rating-icon"
          data-cy="start-rating-img"
          src={index + 1 <= rating ? filledStar : unfilledStar}
          alt="rating-star"
        />
      ))}
      <strong>({count})</strong>
    </div>
  );
}
