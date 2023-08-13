import { Link } from 'react-router-dom';
import CardList from '../card-list/card-list';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getFavoritesGroupByCity } from '../../store/favorites-process/selectors';


function GroupCardList(): JSX.Element {
  const offers = useAppSelector(getFavoritesGroupByCity);
  return (
    <ul className="favorites__list">
      {
        offers.map((groupOffer) => {
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
