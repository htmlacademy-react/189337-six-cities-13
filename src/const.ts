import { StatusCodes } from 'http-status-codes';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NotFound = '/*'
}

export enum OfferTypes {
  House = 'house',
  Apartment = 'apartment',
  Hotel = 'hotel'
}

export enum ResourcePath {
  Pin = '/img/pin.svg',
  PinActive = '/img/pin-active.svg'
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
  Global = 'global',
  Cities = 'cities',
  Offer = 'offer',
  User = 'user',
  Data = 'data',
  Reviews = 'reviews',
  Favorites = 'favorites'
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Favorites = '/favorite',
  Comments = '/comments'
}

export const StatusCodeError: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

export enum ReviewsConfig {
  CountOnFavoritePage = 10,
  CommentMinLength = 50,
  CommentMaxLength = 300,
  ClearCommentStatusTime = 3000
}

export enum RequestStatus {
  Idle = 0,
  Pending = 1,
  Success = 2,
  Error = 3
}

export enum BookmarkIconConfig {
  baseWidth = 18,
  baseHeight = 19,
  offerWidth = 31,
  offerHeight = 33
}

export enum LogoIconConfig {
  baseWidth = 81,
  baseHeight = 41,
  footerWidth = 64,
  footerHeight = 33
}

export const NEARBY_OFFERS_COUNT_ON_OFFER_PAGE = 3;

export const GLOBAL_TOAST_ID = 'GLOBAL_TOAST_ID';
