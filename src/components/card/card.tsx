import { Link, useNavigate } from 'react-router-dom';
import { Offer } from '../../types/offers';
import { AppRoute } from '../../const';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectOffer } from '../../store/action';
import { setOfferIsFavorite } from '../../store/api-action';

type CardProps = {
  offer: Offer;
  className?: string;
};

export default function Card({ offer, className = 'cities' }: CardProps): JSX.Element {
  const { id, title, price, type, rating, isPremium, isFavorite } = offer;
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOnMain = className === 'cities';
  const isOnFavorite = className === 'favorites';
  const isOnOffer = className === 'near-places';

  const handleAddToFavorite = (): void => {
    if (isAuth) {
      dispatch(setOfferIsFavorite(offer));
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <article className={classNames({
      'cities__card': isOnMain,
      'favorites__card': isOnFavorite,
      'near-places__card': isOnOffer
    }, 'place-card')}
    onMouseEnter={() => {
      dispatch(selectOffer(offer));
    }}
    onMouseLeave={() => {
      dispatch(selectOffer(null));
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
          }
          type="button"
          onClick={handleAddToFavorite}
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
