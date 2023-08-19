import { createSlice } from '@reduxjs/toolkit';
import { ActionGroup, NEARBY_OFFERS_COUNT_ON_OFFER_PAGE, RequestStatus } from '../../const';
import { addOfferToFavorites, fetchOffer, fetchOffersNearby } from '../api-action';
import { OfferProcess } from '../../types/offers';
import { changeOfferIsFavorite, getRandomThreeElements } from '../../cities';

const initialState: OfferProcess = {
  offer: null,
  offersNearby: [],
  fetch: {
    offer: RequestStatus.Idle,
    offersNearby: RequestStatus.Idle
  }
};

export const offerProcess = createSlice({
  name: ActionGroup.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffer.fulfilled, (state, { payload }) => {
        state.fetch.offer = RequestStatus.Success;
        state.offer = payload;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.fetch.offer = RequestStatus.Error;
      })
      .addCase(fetchOffersNearby.fulfilled, (state, { payload }) => {
        state.offersNearby = getRandomThreeElements(payload, NEARBY_OFFERS_COUNT_ON_OFFER_PAGE);
      })
      .addCase(addOfferToFavorites.fulfilled, (state, { payload: { id, isFavorite } }) => {
        state.offersNearby = changeOfferIsFavorite(state.offersNearby, id, isFavorite);
        if (state.offer) {
          state.offer.isFavorite = isFavorite;
        }
      });
  }
});
