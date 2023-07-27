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

export const Settings = {
  isAuth: true,
  activeCity: 'Amsterdam'
};

export const TAB_BAR_CITIES = [
  'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'
] as const;
