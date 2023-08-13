import { SortingTypes } from './const';
import { Cities } from './types/city';
import { Offer, OfferDetails } from './types/offers';
import { Review } from './types/review';
import { SortingType } from './types/state';

export const sortOffers = (offers: Offer[], sortingType: SortingType): Offer[] => {
  const out = offers.slice();
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
      out.sort(sortFunc);
    }
  }
  return out;
};

export const sortReviews = (reviews: Review[]): Review[] => reviews.sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const changeOfferIsFavorite = (offers: Offer[], offerId: Offer['id'], isFavorite: boolean): Offer[] =>
  offers.map((offer) => offer.id === offerId ? { ...offer, isFavorite } : offer);

export const convertOfferDetailsToOffer = (offer: OfferDetails): Offer => ({ ...offer, previewImage: '' } as Offer);

export const getRandomThreeElements = <T>(arr: T[], length: number): T[] => {
  const shuffledArray = [...arr];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray.slice(0, length);
};

export const getOffersByActiveCity = (offers: Offer[], activeCity: Cities) => offers.filter(({ city: { name } }) => name === activeCity);

export const getRandomElement = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
