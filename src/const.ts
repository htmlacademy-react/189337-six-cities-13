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

export const Settings = {
  isAuth: true,
  activeCity: 'Amsterdam'
};

export const TAB_BAR_CITIES = [
  'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'
] as const;
