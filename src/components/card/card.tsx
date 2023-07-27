import { Link } from 'react-router-dom';
import { Offer } from '../../types/offers';
import { AppRoute } from '../../const';
import classNames from 'classnames';

type CardProps = {
  offer: Offer;
  className?: string;
  handleChangeSelectedOffer?: (offer: Offer | null) => void;
};

export default function Card({ offer, className = 'cities', handleChangeSelectedOffer }: CardProps): JSX.Element {
  const { id, title, price, type, rating, isPremium, isFavorite } = offer;
  const isOnMain = className === 'cities';
  const isOnFavorite = className === 'favorites';
  const isOnOffer = className === 'near-places';
  return (
    <article className={classNames({
      'cities__card': isOnMain,
      'favorites__card': isOnFavorite,
      'near-places__card': isOnOffer
    }, 'place-card')}
    onMouseEnter={() => {
      handleChangeSelectedOffer?.(offer);
    }}
    onMouseLeave={() => {
      handleChangeSelectedOffer?.(null);
    }}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={classNames({
        'cities__image-wrapper': isOnMain,
        'favorites__image-wrapper': isOnFavorite,
        'near-places__image-wrapper': isOnOffer
      }, 'place-card__image-wrapper')}
      >
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={offer.previewImage} width={isOnFavorite ? 150 : 260} height={isOnFavorite ? 110 : 200} alt="Place image" />
        </Link>
      </div>
      <div className={classNames({ 'favorites__card-info': isOnFavorite }, 'place-card__info')}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={
            classNames({
              'place-card__bookmark-button--active': isFavorite
            }, 'place-card__bookmark-button', 'button')
          } type="button"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 10}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      </div>
    </article >
  );
}
