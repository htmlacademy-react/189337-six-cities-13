import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import CardList from '../../components/card-list/card-list';
import { GroupOfferByCity, Offer } from '../../types/offers';
import TabBar from '../../components/tab-bar/tab-bar';
import { Settings, CITIES } from '../../const';
import SortingMenu from '../../components/sorting-menu/sorting-menu';
import Map from '../../components/map/map';
import { getGroupOffersByCity } from '../../helpers';
import { useState } from 'react';

type MainScreenProps = {
  offers: Offer[];
}

export default function Main({ offers }: MainScreenProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>();
  const groupOffersByCity = getGroupOffersByCity(offers);
  const groupOffer: GroupOfferByCity | undefined = groupOffersByCity[Settings.activeCity];
  const isNotEmpty = groupOffer && !!groupOffer.offers.length;

  const handleChangeSelectedOffer = (offer?: Offer | null) => {
    setSelectedOffer(offer);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header activeLogo />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <TabBar items={CITIES} />
        <div className="cities">
          {isNotEmpty ?
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">312 places to stay in Amsterdam</b>
                <SortingMenu />
                <CardList
                  classNameWrapper="cities__places-list  places__list tabs__content"
                  classNameCardPrefix="cities"
                  offers={offers}
                  handleChangeSelectedOffer={handleChangeSelectedOffer}
                />
              </section>
              <div className="cities__right-section">
                <Map className={'cities__map'} groupOffer={groupOffer} selectedOffer={selectedOffer} />
              </div>
            </div>
            :
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>}
        </div>
      </main>
    </div>
  );
}
