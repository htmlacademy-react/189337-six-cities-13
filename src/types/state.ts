import { SortingTypes } from '../const';
import { store } from '../store';
import { Cities } from './city';
import { GroupOfferByCity, GroupOfferByCityObject, Offer } from './offers';

export type SortingType = typeof SortingTypes[keyof typeof SortingTypes]

export type State = {
  activeCity: Cities;
  groupOffers: GroupOfferByCity | null | undefined;
  groupOffersByCity: GroupOfferByCityObject;
  selectedOffer: Offer | null;
  sortingMenu: {
    visible: boolean;
    activeSort: SortingType;
  };
}

export type Selector = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
