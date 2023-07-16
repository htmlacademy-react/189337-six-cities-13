import { useState } from 'react';
import { reviews } from '../../mocks/reviews';
import { Review as ReviewType } from '../../types/review';
import ReviewForm from '../review-form/review-form';
import ReviewList from '../review-list/review-list';

type ReviewProps = {
  offerId: string;
}

export default function Review({ offerId }: ReviewProps) {
  let reviewsState: ReviewType[] = [];
  if (offerId) {
    reviewsState = reviews[offerId] || [];
  }
  const [reviewsCurrent, setReviews] = useState(reviewsState);
  const addReview = (review: ReviewType) => {
    setReviews((prev) => prev.find((el) => el.id === review.id) ? [...prev] : [...prev, review]);
  };
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviewsCurrent ? reviewsCurrent.length : 0}</span>
      </h2>
      {reviewsCurrent && <ReviewList reviews={reviewsCurrent} />}
      <ReviewForm addReview={addReview} />
    </section>
  );
}
