import { RequestStatus } from '../../const';
import { makeFakeOfferDetails } from '../../utils/mock';
import { fetchOffer } from '../api-action';
import { offerProcess } from './offer-process';

describe('OfferProcess Slice', () => {
  it('should set offers', () => {

    const offer = makeFakeOfferDetails();
    const offerStatus = RequestStatus.Success;
    const expectedState = {
      offer: null,
      offersNearby: [],
      fetch: {
        offer: RequestStatus.Idle,
        offersNearby: RequestStatus.Idle
      }
    };

    const result = offerProcess.reducer(expectedState, fetchOffer.fulfilled(offer,'',''));

    expect(result.offer).toEqual(offer);
    expect(result.fetch.offer).toBe(offerStatus);
  });
});
