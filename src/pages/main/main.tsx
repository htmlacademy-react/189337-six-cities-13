import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import CardList from '../../components/card-list/card-list';
import { Offer } from '../../types/offers';
import TabBar from '../../components/tab-bar/tab-bar';
import { Settings, TAB_BAR_CITIES } from '../../const';
import SortingMenu from '../../components/sorting-menu/sorting-menu';

type MainScreenProps = {
  offers: Offer [];
}

export default function Main({ offers }: MainScreenProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header activeLogo/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <TabBar items={TAB_BAR_CITIES} activeItem={Settings.activeCity}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <SortingMenu />
              <CardList classNameWrapper="cities__places-list  places__list tabs__content" classNameCardPrefix="cities" offers={offers}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
