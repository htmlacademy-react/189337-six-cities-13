import { CITIES, RequestStatus } from '../const';
import { Location, Offer } from './offers';
import { SortingType } from './state';

export type Cities = typeof CITIES[number]

export type City = {
  name: Cities;
  location: Location;
}

export type CitiesFetchStatus = {
  offers: RequestStatus;
  addOfferToFavorites: RequestStatus;
}

export type CitiesProcess = {
  activeCity: Cities;
  cityInfo: City | null;
  offers: Offer [];
  offersAll: Offer [];
  offerSelected: Offer | null;
  sortingMenu: {
    visible: boolean;
    activeSort: SortingType;
  };
  fetch: CitiesFetchStatus;
};
