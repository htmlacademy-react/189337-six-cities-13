import { OfferTypes } from '../const';

export type OfferType = typeof OfferTypes[keyof typeof OfferTypes];

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  name: string;
  location: Location;
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

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type Details = {
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
}


export type OfferDetails = Offer & Details;

export type GroupOfferByCity = {
  city: City;
  offers: Offer [];
}

export type GroupOfferDetailsById = {
  [key: string]: OfferDetails;
}
