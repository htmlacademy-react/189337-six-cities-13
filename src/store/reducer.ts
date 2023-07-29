import { createReducer } from '@reduxjs/toolkit';
import { changeActiveCity, selectOffer } from './action';
import { State } from '../types/state';
import { getGroupOffersByCity } from '../cities';
import { offers } from '../mocks/offers';


const initialState: State = {
  activeCity: 'Paris',
  groupOffers: null,
  selectedOffer: null
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeActiveCity, (state, { payload }) => {
    state.activeCity = payload;
    state.groupOffers = getGroupOffersByCity(offers)[state.activeCity] || null;
  }).addCase(selectOffer, (state, { payload }) => {
    state.selectedOffer = payload;
  });
});

export { reducer };
