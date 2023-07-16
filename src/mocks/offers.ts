import { OfferTypes } from '../const';
import { GroupOfferDetailsById, Offer } from '../types/offers';

export const offers: Offer[] = [
  {
    id: 'O1',
    title: 'Beautiful & luxurious apartment at great location',
    type: OfferTypes.House,
    price: 716,
    previewImage: 'img/apartment-01.jpg',
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
    isFavorite: true,
    isPremium: true,
    rating: 1.2
  },
  {
    id: 'O2',
    title: 'Canal View Prinsengracht',
    type: OfferTypes.Apartment,
    price: 177,
    previewImage: 'img/apartment-02.jpg',
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
    isFavorite: true,
    isPremium: false,
    rating: 2
  },
  {
    id: 'O3',
    title: 'Tile House',
    type: OfferTypes.House,
    price: 107,
    previewImage: 'img/apartment-03.jpg',
    city: {
      name: 'Moscow',
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
    isFavorite: true,
    isPremium: false,
    rating: 4
  },
  {
    id: 'O4',
    title: 'House in countryside',
    type: OfferTypes.Hotel,
    price: 327,
    previewImage: 'img/apartment-01.jpg',
    city: {
      name: 'Moscow',
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
    isFavorite: true,
    isPremium: true,
    rating: 4.6
  }
];

export const offersDetails = offers.reduce((acc: GroupOfferDetailsById, offer) => {
  acc[offer.id] = {
    ...offer, ...{
      description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      bedrooms: Math.floor(Math.random() * 5) + 1,
      goods: ['Wi-Fi', 'Washing machine'],
      host: {
        name: 'Oliver Conner',
        avatarUrl: 'img/avatar-max.jpg',
        isPro: false
      },
      images: [offer.previewImage],
      maxAdults: Math.floor(Math.random() * 5) + 1
    }
  };
  return acc;
}, {});
