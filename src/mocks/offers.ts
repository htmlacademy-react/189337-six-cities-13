import { OfferTypes } from '../const';
import { Offer } from '../types/offers';

export const offers: Offer[] = [
  {
    id: crypto.randomUUID(),
    title: 'Beautiful & luxurious apartment at great location',
    type: OfferTypes.House,
    price: 716,
    previewImage: 'https://13.design.pages.academy/static/hotel/4.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 1.2
  },
  {
    id: crypto.randomUUID(),
    title: 'Canal View Prinsengracht',
    type: OfferTypes.Apartment,
    price: 177,
    previewImage: 'https://13.design.pages.academy/static/hotel/15.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 2
  },
  {
    id: crypto.randomUUID(),
    title: 'Tile House',
    type: OfferTypes.House,
    price: 107,
    previewImage: 'https://13.design.pages.academy/static/hotel/12.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.335499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4
  },
  {
    id: crypto.randomUUID(),
    title: 'House in countryside',
    type: OfferTypes.Hotel,
    price: 327,
    previewImage: 'https://13.design.pages.academy/static/hotel/3.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.85761,
      longitude: 2.358499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.6
  }
];
