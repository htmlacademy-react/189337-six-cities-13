import { Offer, GroupOfferByCity } from '../../types/offers';
import CardList from '../card-list/card-list';

type GroupCardListProps = {
  offers: Offer[];
}

const getGroupOfferByCity = (offers: Offer[]): GroupOfferByCity[] => {
  const aFiltered = offers.filter(({ isFavorite }) => isFavorite);
  const oGroup = aFiltered.reduce((acc: { [key: string]: GroupOfferByCity }, offer) => {
    const { city: { name } } = offer;
    if (!acc[name]) {
      acc[name] = { city: offer.city, offers: [] };
    }
    acc[name].offers.push(offer);
    return acc;
  }, {});
  return Object.values(oGroup);
};

export default function GroupCardList({ offers }: GroupCardListProps): JSX.Element {
  return (
    <ul className="favorites__list">
      {
        getGroupOfferByCity(offers).map((groupOffer) => {
          const { city: { name } } = groupOffer;
          return (
            <li key={name} className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>{name}</span>
                  </a>
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
