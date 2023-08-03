import { SortingTypes } from './const';
import { GroupOfferByCity, GroupOfferByCityObject, Offer } from './types/offers';
import { SortingType } from './types/state';

export const sortOffers = (groupOffers: GroupOfferByCity | null | undefined, sortingType: SortingType = SortingTypes.Popular): GroupOfferByCity | null | undefined => {
  let out = groupOffers;
  let sortFunc: ((a: Offer, b: Offer) => number) | undefined;
  if (out) {
    switch (sortingType) {
      case SortingTypes.PriceLowToHigh:
        sortFunc = ((a, b) => a.price - b.price);
        break;
      case SortingTypes.PriceHighToLow:
        sortFunc = ((a, b) => b.price - a.price);
        break;
      case SortingTypes.TopRatedFirst:
        sortFunc = ((a, b) => b.rating - a.rating);
        break;
      case SortingTypes.Popular:
      default:
        break;
    }
    if (sortFunc) {
      out = { ...out, offers: out.offers.slice() };
      out.offers.sort(sortFunc);
    }
  }
  return out;
};

export const getGroupOffersByCity = (offers: Offer[]): GroupOfferByCityObject =>
  offers.reduce((acc: GroupOfferByCityObject, offer) => {
    const { city: { name } } = offer;
    if (!acc[name]) {
      acc[name] = { city: offer.city, offers: [] };
    }
    acc[name]?.offers.push(offer);
    return acc;
  }, {});

