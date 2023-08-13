import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { useLocation, useParams } from 'react-router-dom';
import Map from '../../components/map/map';
import ReviewSection from '../../components/review/review';
import CardList from '../../components/card-list/card-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOffer } from '../../store/api-action';
import { useEffect } from 'react';
import Loader from '../../components/loader/loader';
import { convertOfferDetailsToOffer } from '../../cities';
import ButtonBookmark from '../../components/button-bookmark/button-bookmark';
import { getOffer, getOffersNearby } from '../../store/offer-process/selectors';

function Offer(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const offer = useAppSelector(getOffer);
  const offersNearby = useAppSelector(getOffersNearby);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
    }
  }, [id, dispatch]);

  return (
    offer ?
      <div className="page">
        <Helmet>
          <title>6 cities: offer</title>
        </Helmet>
        <Header />
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {
                  offer.images.map((image) => (
                    <div key={image} className="offer__image-wrapper">
                      <img
                        className="offer__image"
                        src={image}
                        alt="Photo studio"
                      />
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {
                  offer.isPremium &&
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                }
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offer.title}
                  </h1>
                  <ButtonBookmark className={'offer'} isActive={offer.isFavorite} offer={offer} />
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${offer.rating * 10}%` }} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">Apartment</li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offer.maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{offer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {
                      offer.goods.map((good) => <li key={good} className="offer__inside-item">{good}</li>)
                    }
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={offer.host.avatarUrl}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{offer.host.name}</span>
                    {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {offer.description}
                    </p>
                  </div>
                </div>
                <ReviewSection />
              </div>
            </div>
            <Map
              className={'offer__map'}
              city={offer.city}
              offers={offersNearby.concat(convertOfferDetailsToOffer(offer))}
              offerSelected={offer}
            />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <CardList
                classNameWrapper="near-places__list places__list"
                classNameCardPrefix="near-places"
                offers={offersNearby}
              />
            </section>
          </div>
        </main>
      </div>
      :
      <Loader />
  );
}

export default Offer;
