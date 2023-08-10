import ReviewForm from '../review-form/review-form';
import ReviewList from '../review-list/review-list';
import { useAppSelector } from '../../hooks';

function Review() {
  const reviews = useAppSelector((state) => state.reviews);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      {!!reviews.length && <ReviewList reviews={reviews} />}
      {isAuth && <ReviewForm />}
    </section>
  );
}

export default Review;
