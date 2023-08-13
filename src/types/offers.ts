import { OfferTypes, RequestStatus } from '../const';
import { Cities, City } from './city';
import { User } from './user';

export type OfferType = typeof OfferTypes[keyof typeof OfferTypes];

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Offer = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  previewImage: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type Host = Omit<User, 'email' | 'token'>;

export type Details = {
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
}


export type OfferDetails = Omit<Offer, 'previewImage'> & Details;

export type GroupOffersByCity = {
  city: City;
  offers: Offer[];
}

export type GroupOfferByCityObject = { [key in Cities]?: GroupOffersByCity }

export type OfferFetchStatus = {
  offer: RequestStatus;
  offersNearby: RequestStatus;
}

export type OfferProcess = {
  offer: OfferDetails | null;
  offersNearby: Offer[];
  fetch: OfferFetchStatus;
}

export type FavoritesFetchStatus = {
  favorites: RequestStatus;
}

export type FavoritesProcess = {
  favorites: Offer[];
  fetch: FavoritesFetchStatus;
}
