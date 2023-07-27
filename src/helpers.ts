import { GroupOfferByCity, Offer } from './types/offers';

export const getGroupOffersByCity = (offers: Offer[]) => offers.reduce((acc: { [key: string]: GroupOfferByCity }, offer) => {
  const { city: { name } } = offer;
  if (!acc[name]) {
    acc[name] = { city: offer.city, offers: [] };
  }
  acc[name].offers.push(offer);
  return acc;
}, {});
