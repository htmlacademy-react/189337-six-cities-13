import ReviewForm from '../review-form/review-form';
import ReviewList from '../review-list/review-list';
import { useAppSelector } from '../../hooks';
import { getReviews, getReviewsLimit } from '../../store/reviews-process/selectors';
import { getIsAuth } from '../../store/user-process/selectors';

function Review() {
  const reviews = useAppSelector(getReviews);
  const reviewsLimit = useAppSelector(getReviewsLimit);
  const isAuth = useAppSelector(getIsAuth);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      {!!reviewsLimit.length && <ReviewList reviews={reviewsLimit} />}
      {isAuth && <ReviewForm />}
    </section>
  );
}

export default Review;
