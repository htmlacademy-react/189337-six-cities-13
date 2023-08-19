import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { Review } from '../../types/review';
import Rating from '../rating/rating';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendComment } from '../../store/api-action';
import { RequestStatus, ReviewsConfig } from '../../const';
import { getOfferId } from '../../store/offer-process/selectors';
import { getSendCommentStatus } from '../../store/reviews-process/selectors';

const formState: Review = {
  id: '',
  date: '',
  user: {
    name: 'Erokhin A.G.',
    avatarUrl: 'img/avatar-max.jpg',
    isPro: true
  },
  comment: '',
  rating: 0
};

function ReviewForm() {
  const [formData, setFormData] = useState(formState);
  const { comment, rating } = formData;
  const [isEnabled, setEnabled] = useState(false);
  const offerId = useAppSelector(getOfferId);
  const sendCommentStatus = useAppSelector(getSendCommentStatus);
  const dispatch = useAppDispatch();

  const clearForm = () => {
    setFormData((prev) => ({ ...prev, comment: '', rating: 0 }));
    setEnabled(false);
  };

  const validateForm = (fieldsForCheck: Pick<Review, 'comment' | 'rating'>) => {
    setEnabled(fieldsForCheck.comment.length >= ReviewsConfig.CommentMinLength && fieldsForCheck.comment.length <= ReviewsConfig.CommentMaxLength && !!fieldsForCheck.rating);
  };

  useEffect(() => {
    validateForm({ comment, rating });
  }, [comment, rating]);

  const setRating = useCallback((value: number) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  }, []);
  const handleChangeComment = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, comment: value }));
  };
  const handleSubmitReview = ((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (offerId) {
      dispatch(sendComment({ id: offerId, comment, rating }));
      clearForm();
    }
  });

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmitReview}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <Rating rating={rating} setRating={setRating} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChangeComment}
        value={comment}
      />
      <div className="reviews__button-wrapper">
        {sendCommentStatus !== RequestStatus.Error && !isEnabled && comment.length <= ReviewsConfig.CommentMaxLength &&
          <p className="reviews__help">
            To submit review please make sure to set
            <span className="reviews__star">rating</span> and describe
            your stay with at least
            <b className="reviews__text-amount">{ReviewsConfig.CommentMinLength} characters</b>.
          </p>}
        {sendCommentStatus !== RequestStatus.Error && !isEnabled && comment.length > ReviewsConfig.CommentMaxLength &&
          <p className="reviews__help">
            Max comment length
            <b className="reviews__text-amount">{ReviewsConfig.CommentMaxLength} characters</b>.
          </p>}
        {sendCommentStatus === RequestStatus.Error &&
          <p className="reviews__help">
            <b style={{ color: 'red' }}>Apologies, but it seems that there was an error on our server while processing your comment.
              Please try again later, and if the issue persists, feel free to contact our support team.
              We appreciate your understanding!
            </b>
          </p>}
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isEnabled}
        >
          Submit
        </button>
      </div>
    </form >
  );
}

export default ReviewForm;
