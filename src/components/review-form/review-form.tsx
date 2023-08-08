import { ChangeEvent, FormEvent, useState } from 'react';
import { Review } from '../../types/review';
import Rating from '../rating/rating';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendComment } from '../../store/api-action';

const REVIEW_COMMENT_MIN_LENGTH = 50;

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

export default function ReviewForm() {
  const [formData, setFormData] = useState(formState);
  const { comment, rating } = formData;
  const [isEnabled, setEnabled] = useState(false);
  const offerId = useAppSelector((state) => state.offer?.id);
  const dispatch = useAppDispatch();

  const clearForm = () => {
    setFormData((prev) => ({ ...prev, comment: '', rating: 0 }));
    setEnabled(false);
  };

  const validateForm = (fieldsForCheck: Pick<Review, 'comment' | 'rating'>) => {
    setEnabled(fieldsForCheck.comment.length > REVIEW_COMMENT_MIN_LENGTH && !!fieldsForCheck.rating);
  };

  const setRating = (value: number) => {
    setFormData((prev) => ({ ...prev, rating: value }));
    validateForm({ comment, rating: value });
  };
  const handleChangeComment = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, comment: value }));
    validateForm({ comment: value, rating });
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
        {!isEnabled &&
          <p className="reviews__help">
            To submit review please make sure to set
            <span className="reviews__star">rating</span> and describe
            your stay with at least
            <b className="reviews__text-amount">{REVIEW_COMMENT_MIN_LENGTH} characters</b>.
          </p>}
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isEnabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
