import { StatusCodes } from 'http-status-codes';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer'
}

export enum OfferTypes {
  House = 'house',
  Apartment = 'apartment',
  Hotel = 'hotel'
}

export enum ResourcePath {
  Pin = 'img/pin.svg',
  PinActive = 'img/pin-active.svg'
}

export enum MapSettings {
  PinIconSizeX = 40,
  PinIconSizeY = 40,
  PinIconAnchorX = 20,
  PinIconAnchorY = 40,
  PinActiveIconSizeX = 40,
  PinActiveIconSizeY = 40,
  PinActiveIconAnchorX = 20,
  PinActiveIconAnchorY = 40,
}

export const CITIES = [
  'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'
] as const;

export enum SortingTypes {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}

export const SORTING_MENUS = [
  SortingTypes.Popular, SortingTypes.PriceLowToHigh, SortingTypes.PriceHighToLow, SortingTypes.TopRatedFirst
] as const;

export enum ActionGroup {
  Main = 'main',
  Offers = 'offers',
  User = 'user',
  Data = 'data'
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout'
}

export const StatusCodeError: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};
