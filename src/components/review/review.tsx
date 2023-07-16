import { reviews } from '../../mocks/reviews';
import { Review as ReviewType } from '../../types/review';
import ReviewForm from '../review-form/review-form';
import ReviewList from '../review-list/review-list';

type ReviewProps = {
  offerId: string;
}

export default function Review({ offerId }: ReviewProps) {
  let currentReviews: ReviewType[] | undefined;
  if (offerId) {
    currentReviews = reviews[offerId];
  }
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{currentReviews ? currentReviews.length : 0}</span>
      </h2>
      {currentReviews && <ReviewList reviews={currentReviews} />}
      <ReviewForm />
    </section>
  );
}
