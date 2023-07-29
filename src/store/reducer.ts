import { createReducer } from '@reduxjs/toolkit';
import { changeActiveCity, changeActiveSort, selectOffer, toggleSortingMenu } from './action';
import { State } from '../types/state';
import { getGroupOffersByCity } from '../cities';
import { offers } from '../mocks/offers';
import { SortingTypes } from '../const';


const initialState: State = {
  activeCity: 'Paris',
  groupOffers: null,
  selectedOffer: null,
  sortingMenu: {
    visible: false,
    activeSort: SortingTypes.Popular
  }
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeActiveCity, (state, { payload }) => {
    state.activeCity = payload;
    state.groupOffers = getGroupOffersByCity(offers, state.sortingMenu.activeSort)[state.activeCity] || null;
  }).addCase(selectOffer, (state, { payload }) => {
    state.selectedOffer = payload;
  }).addCase(toggleSortingMenu, (state, { payload }) => {
    state.sortingMenu.visible = payload;
  }).addCase(changeActiveSort, (state, { payload }) => {
    state.sortingMenu.activeSort = payload;
    state.groupOffers = getGroupOffersByCity(offers, state.sortingMenu.activeSort)[state.activeCity] || null;
  });
});

export { reducer };
