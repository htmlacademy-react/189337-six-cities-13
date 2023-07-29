import { SortingTypes } from './const';
import { GroupOfferByCity, Offer } from './types/offers';
import { SortingType } from './types/state';

export const sortOffers = (offers: Offer[], sortingType: SortingType) => {
  let sortFunc: ((a: Offer, b: Offer) => number) | undefined;
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
  if(sortFunc) {
    offers.sort(sortFunc);
  }
};

export const getGroupOffersByCity = (offers: Offer[], sortingType: SortingType = SortingTypes.Popular) => {
  const groupOffersByCity = offers.reduce((acc: { [key: string]: GroupOfferByCity }, offer) => {
    const { city: { name } } = offer;
    if (!acc[name]) {
      acc[name] = { city: offer.city, offers: [] };
    }
    acc[name].offers.push(offer);
    return acc;
  }, {});
  Object.keys(groupOffersByCity).forEach((city) => {
    sortOffers(groupOffersByCity[city].offers, sortingType);
  });
  return groupOffersByCity;
};

