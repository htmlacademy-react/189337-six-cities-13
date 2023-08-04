import { SortingTypes } from '../const';
import { store } from '../store';
import { Cities } from './city';
import { GroupOfferByCity, GroupOfferByCityObject, Offer, OfferDetails } from './offers';
import { Review } from './review';
import { AuthorizationInfo } from './user';

export type SortingType = typeof SortingTypes[keyof typeof SortingTypes]

export type State = {
  activeCity: Cities;
  offers: Offer[];
  offer: OfferDetails | null;
  offersNearby: Offer[];
  reviews: Review[];
  groupOffers: GroupOfferByCity | null | undefined;
  groupOffersByCity: GroupOfferByCityObject;
  favorites: Offer[];
  selectedOffer: Offer | null;
  sortingMenu: {
    visible: boolean;
    activeSort: SortingType;
  };
  auth: AuthorizationInfo;
  isLoading: boolean;
}

export type Selector = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
