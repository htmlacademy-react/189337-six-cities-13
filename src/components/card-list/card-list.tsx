import { Offer, GroupOfferByCity } from '../../types/offers';
import Card from '../card/card';

type CardListProps = {
  offers: Offer[];
  isMain?: boolean;
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

export default function CardList({ offers, isMain = true }: CardListProps): JSX.Element {
  return (
    isMain ?
      <div className="cities__places-list places__list tabs__content">
        {
          offers.map((offer) => <Card key={offer.id} offer={offer} />)
        }
      </div >
      :
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
                <div className="favorites__places">
                  {
                    groupOffer.offers.map((offer) => <Card key={offer.id} offer={offer} />)
                  }
                </div>
              </li>
            );
          })
        }
      </ul>
  );
}
