import { SortingTypes } from '../const';
import { store } from '../store';
import { Cities } from './city';
import { GroupOfferByCity, GroupOfferByCityObject, Offer } from './offers';
import { AuthorizationInfo } from './user';

export type SortingType = typeof SortingTypes[keyof typeof SortingTypes]

export type State = {
  activeCity: Cities;
  offers: Offer[];
  groupOffers: GroupOfferByCity | null | undefined;
  groupOffersByCity: GroupOfferByCityObject;
  selectedOffer: Offer | null;
  sortingMenu: {
    visible: boolean;
    activeSort: SortingType;
  };
  auth: AuthorizationInfo;
}

export type Selector = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
