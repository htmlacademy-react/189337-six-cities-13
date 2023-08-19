import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { CITIES, OfferTypes, RequestStatus, SortingTypes } from '../const';
import { FetchStatusObject } from '../types/api';
import { CitiesFetchStatus, CitiesProcess, City } from '../types/city';
import { Offer, Location, OfferDetails, OfferType } from '../types/offers';
import { Review } from '../types/review';
import { User } from '../types/user';
import * as faker from 'faker';

export const makeFakeFetchStatus = <T>(keys: (keyof T)[]): T =>
  keys.reduce((acc: FetchStatusObject<T>, key) => {
    acc[key] = RequestStatus.Idle;
    return acc;
  }, {}) as T;

export const makeFakeUser = (): User => ({
  name: faker.name.findName(),
  avatarUrl: faker.image.avatar(),
  isPro: faker.datatype.boolean(),
  email: faker.internet.email(),
  token: faker.random.alphaNumeric(16)
});

export const makeFakeReview = (): Review => ({
  id: faker.datatype.hexaDecimal(),
  date: faker.date.past().toISOString(),
  user: makeFakeUser(),
  comment: faker.lorem.sentences(faker.datatype.number({ min: 2, max: 6 })), // Генерация случайного комментария
  rating: faker.datatype.number({ min: 1, max: 5 })
});

export const makeFakeReviews = (): Review[] => new Array(10).map(() => makeFakeReview());

export const makeFakeLocation = (): Location => ({
  latitude: parseFloat(faker.address.latitude()),
  longitude: parseFloat(faker.address.longitude()),
  zoom: faker.datatype.number({ min: 10, max: 15 }),
});

export const makeFakeCity = (): City => ({
  name: CITIES[faker.datatype.number({ min: 1, max: 5 })],
  location: makeFakeLocation()
});

export const getRandomOfferType = (): OfferType => {
  const offerTypeValues = Object.values(OfferTypes);
  const randomIndex = faker.datatype.number({ min: 0, max: offerTypeValues.length - 1 });
  return offerTypeValues[randomIndex];
};

export const makeFakeOffer = (): Offer => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: getRandomOfferType(),
  price: faker.datatype.number({ min: 50, max: 1000 }),
  previewImage: faker.image.imageUrl(),
  city: makeFakeCity(),
  location: makeFakeLocation(),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.number({ min: 1, max: 5 }),
});

export const makeFakeOffers = (): Offer[] => new Array(20).map(() => makeFakeOffer());

export const makeFakeOfferDetails = (): OfferDetails => {
  const offer = makeFakeOffer();

  return {
    ...offer,
    description: faker.lorem.paragraph(),
    bedrooms: faker.datatype.number({ min: 1, max: 5 }),
    goods: faker.lorem.words(5).split(' '),
    host: makeFakeUser(),
    images: [faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()],
    maxAdults: faker.datatype.number({ min: 1, max: 10 }),
  };
};

export const makeEmptyCitiesState = (): CitiesProcess => ({
  activeCity: CITIES[0], cityInfo: null, offers: [], offersAll: [], offerSelected: null, sortingMenu: { visible: false, activeSort: SortingTypes.Popular },
  fetch: makeFakeFetchStatus<CitiesFetchStatus>(['offers', 'addOfferToFavorites'])
});
