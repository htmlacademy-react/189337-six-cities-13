import { Link } from 'react-router-dom';
import { Offer } from '../../types/offers';
import { AppRoute } from '../../const';
import classNames from 'classnames';
import { useAppDispatch } from '../../hooks';
import ButtonBookmark from '../button-bookmark/button-bookmark';
import { setOfferSelected } from '../../store/cities-process/cities-process';
import { memo } from 'react';

type CardProps = {
  offer: Offer;
  className?: string;
};

function Card({ offer, className = 'cities' }: CardProps): JSX.Element {
  const { id, title, price, type, rating, isPremium, isFavorite } = offer;
  const dispatch = useAppDispatch();
  const isOnMain = className === 'cities';
  const isOnFavorite = className === 'favorites';
  const isOnOffer = className === 'near-places';

  const handleMouseEnterCard = () => {
    if (!isOnOffer) {
      dispatch(setOfferSelected(offer));
    }
  };

  const handleMouseLeaveCard = () => {
    if (!isOnOffer) {
      dispatch(setOfferSelected(null));
    }
  };

  return (
    <article className={classNames({
      'cities__card': isOnMain,
      'favorites__card': isOnFavorite,
      'near-places__card': isOnOffer
    }, 'place-card')}
    onMouseEnter={handleMouseEnterCard}
    onMouseLeave={handleMouseLeaveCard}
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
          <ButtonBookmark className={'place-card'} isActive={isFavorite} offer={offer} />
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

const CardMemo = memo(Card);
export default CardMemo;
