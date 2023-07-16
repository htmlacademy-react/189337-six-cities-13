import { GroupReviewById } from '../types/review';
import { offers } from './offers';

export const reviews = offers.reduce((acc: GroupReviewById, offer) => {
  if (!acc[offer.id]) {
    acc[offer.id] = [];
  }
  acc[offer.id].push({
    id: crypto.randomUUID(),
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  });
  return acc;
}, {});
