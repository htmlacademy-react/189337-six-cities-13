import { ActionGroup } from '../../const';
import { OfferProcess, OfferFetchStatus } from '../../types/offers';
import { makeFakeFetchStatus, makeFakeOfferDetails, makeFakeOffers } from '../../utils/mock';
import { getOffer, getOffersNearby, getOfferId } from './selectors';

describe('OfferProcess selectors', () => {
  it('should return offer from state', () => {
    const offer = makeFakeOfferDetails();
    const state: OfferProcess = { offer, offersNearby: [], fetch: makeFakeFetchStatus<OfferFetchStatus>(['offer', 'offersNearby']) };

    const result = getOffer({ [ActionGroup.Offer]: state });

    expect(result).toEqual(offer);
  });

  it('should return offersNearby from state', () => {
    const offersNearby = makeFakeOffers();
    const state: OfferProcess = { offer: null, offersNearby, fetch: makeFakeFetchStatus<OfferFetchStatus>(['offer', 'offersNearby']) };

    const result = getOffersNearby({ [ActionGroup.Offer]: state });

    expect(result).toEqual(offersNearby);
  });

  it('should return offerId from state', () => {
    const offer = makeFakeOfferDetails();
    const offerId = offer.id;
    const state: OfferProcess = { offer, offersNearby: [], fetch: makeFakeFetchStatus<OfferFetchStatus>(['offer', 'offersNearby']) };

    const result = getOfferId({ [ActionGroup.Offer]: state });

    expect(result).toBe(offerId);
  });
});
