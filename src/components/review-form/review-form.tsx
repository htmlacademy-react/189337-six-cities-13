import { ChangeEvent, FormEvent, useState } from 'react';
import { Review } from '../../types/review';

type ReviewFormProps = {
  addReview: (review: Review) => void;
};

const formState: Review = {
  id: crypto.randomUUID(),
  date: '',
  user: {
    name: 'Erokhin A.G.',
    avatarUrl: 'img/avatar-max.jpg',
    isPro: true
  },
  comment: '',
  rating: 0
};

export default function ReviewForm({ addReview }: ReviewFormProps) {
  const [formData, setFormData] = useState(formState);
  const { comment, rating } = formData;
  const handleChangeRating = ({ target: { defaultValue } }: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, rating: +defaultValue }));
  };
  const handleChangeComment = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, comment: value }));
  };
  const handleSubmitReview = ((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setFormData((prev) => {
      addReview({...prev, date: new Date().toISOString()});
      return ({...prev, id: crypto.randomUUID(), comment: '', rating: 0 });
    });
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
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={5}
          id="5-stars"
          type="radio"
          checked={rating === 5}
          onChange={handleChangeRating}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={4}
          id="4-stars"
          type="radio"
          checked={rating === 4}
          onChange={handleChangeRating}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={3}
          id="3-stars"
          type="radio"
          checked={rating === 3}
          onChange={handleChangeRating}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={2}
          id="2-stars"
          type="radio"
          checked={rating === 2}
          onChange={handleChangeRating}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={1}
          id="1-star"
          type="radio"
          checked={rating === 1}
          onChange={handleChangeRating}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChangeComment}
        value={comment}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span> and describe
          your stay with at least
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={false}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
