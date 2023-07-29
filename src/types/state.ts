import { store } from '../store';
import { Cities } from './city';
import { GroupOfferByCity, Offer } from './offers';

export type State = {
  activeCity: Cities;
  groupOffers: GroupOfferByCity | null;
  selectedOffer: Offer | null;
}

export type Selector = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
