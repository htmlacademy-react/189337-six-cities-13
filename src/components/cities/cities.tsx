import CardList from '../../components/card-list/card-list';
import SortingMenu from '../../components/sorting-menu/sorting-menu';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import { getActiveCity, getCityInfo, getOffersSorted } from '../../store/cities-process/selectors';
import { memo } from 'react';

function Cities(): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getOffersSorted);
  const cityInfo = useAppSelector(getCityInfo);

  const isNotEmpty = !!offers.length && cityInfo;

  return (
    <div className="cities">
      {isNotEmpty ?
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {activeCity}</b>
            <SortingMenu />
            <CardList
              classNameWrapper="cities__places-list  places__list tabs__content"
              classNameCardPrefix="cities"
              offers={offers}
            />
          </section>
          <div className="cities__right-section">
            <Map className={'cities__map'} city={cityInfo} offers={offers} />
          </div>
        </div>
        :
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in {activeCity}</p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>}
    </div>
  );
}

const CitiesMemo = memo(Cities);
export default CitiesMemo;
