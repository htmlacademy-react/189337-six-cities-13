import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { Navigate, useParams } from 'react-router-dom';
import { offers, offersDetails } from '../../mocks/offers';
import { GroupOfferByCity, OfferDetails } from '../../types/offers';
import Map from '../../components/map/map';
import ReviewSection from '../../components/review/review';
import CardList from '../../components/card-list/card-list';
import { getGroupOffersByCity } from '../../cities';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';

export default function Offer(): JSX.Element {
  const { id } = useParams();
  const [currentOffer, setCurrentOffer] = useState<OfferDetails | null | undefined>(id ? offersDetails[id] : null);
  const [groupOffer, setGroupOffer] = useState<GroupOfferByCity | null | undefined>(null);
  const selectedOffer = useAppSelector((state) => state.selectedOffer);

  useEffect(() => {
    if (id) {
      setCurrentOffer(offersDetails[id] || null);
    }
  }, [id]);

  useEffect(() => {
    if (currentOffer) {
      const groupOffersByCity = getGroupOffersByCity(offers);
      const currentGroupOffer = groupOffersByCity[currentOffer.city.name];
      if (currentGroupOffer) {
        currentGroupOffer.offers = currentGroupOffer.offers.slice(0, 3);
      }
      setGroupOffer(currentGroupOffer);
    }
  }, [currentOffer]);

  return (
    currentOffer ?
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
                  currentOffer.images.map((image) => (
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
                  currentOffer.isPremium &&
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                }
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {currentOffer.title}
                  </h1>
                  <button className="offer__bookmark-button button" type="button">
                    <svg className="offer__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${currentOffer.rating * 10}%` }} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">Apartment</li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {currentOffer.bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {currentOffer.maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{currentOffer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {
                      currentOffer.goods.map((good) => <li key={good} className="offer__inside-item">{good}</li>)
                    }
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={currentOffer.host.avatarUrl}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{currentOffer.host.name}</span>
                    {currentOffer.host.isPro && <span className="offer__user-status">Pro</span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {currentOffer.description}
                    </p>
                  </div>
                </div>
                <ReviewSection offerId={currentOffer.id} />
              </div>
            </div>
            {groupOffer && <Map className={'offer__map'} groupOffer={groupOffer} selectedOffer={selectedOffer} />}
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              {groupOffer &&
                <CardList
                  classNameWrapper="near-places__list places__list"
                  classNameCardPrefix="near-places"
                  offers={groupOffer.offers}
                />}
            </section>
          </div>
        </main>
      </div>
      :
      <Navigate to="*" />
  );
}
