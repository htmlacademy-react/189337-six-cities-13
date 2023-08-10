import { Link } from 'react-router-dom';
import { Offer, GroupOfferByCity } from '../../types/offers';
import CardList from '../card-list/card-list';
import { AppRoute } from '../../const';
import { getGroupOffersByCity } from '../../cities';
import { useAppSelector } from '../../hooks';

const getOffersByCity = (offers: Offer[]): GroupOfferByCity[] => {
  const groupOffersByCity = getGroupOffersByCity(offers);
  return Object.values(groupOffersByCity);
};

function GroupCardList(): JSX.Element {
  const offers = useAppSelector((state) => state.favorites);
  return (
    <ul className="favorites__list">
      {
        getOffersByCity(offers).map((groupOffer) => {
          const { city: { name } } = groupOffer;
          return (
            <li key={name} className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <Link className="locations__item-link" to={AppRoute.Main}>
                    <span>{name}</span>
                  </Link>
                </div>
              </div>
              <CardList classNameWrapper="favorites__places" classNameCardPrefix="favorites" offers={groupOffer.offers} />
            </li>
          );
        })
      }
    </ul>
  );
}

export default GroupCardList;
