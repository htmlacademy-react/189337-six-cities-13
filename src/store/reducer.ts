import { createReducer } from '@reduxjs/toolkit';
import { changeActiveCity, changeActiveSort, loadOffers, requireAuthorization, selectOffer, toggleSortingMenu } from './action';
import { State } from '../types/state';
import { getGroupOffersByCity, sortOffers } from '../cities';
import { offers } from '../mocks/offers';
import { SortingTypes } from '../const';


const initialState: State = {
  activeCity: 'Paris',
  offers: [],
  groupOffers: null,
  groupOffersByCity: getGroupOffersByCity(offers),
  selectedOffer: null,
  sortingMenu: {
    visible: false,
    activeSort: SortingTypes.Popular
  },
  isAuth: false
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeActiveCity, (state, { payload }) => {
    state.activeCity = payload;
    state.groupOffers = sortOffers(state.groupOffersByCity[state.activeCity], state.sortingMenu.activeSort);
  }).addCase(selectOffer, (state, { payload }) => {
    state.selectedOffer = payload;
  }).addCase(toggleSortingMenu, (state, { payload }) => {
    state.sortingMenu.visible = payload;
  }).addCase(changeActiveSort, (state, { payload }) => {
    state.sortingMenu.activeSort = payload;
    state.groupOffers = sortOffers(state.groupOffers, state.sortingMenu.activeSort);
  }).addCase(loadOffers, (state, { payload }) => {
    state.offers = payload;
  }).addCase(requireAuthorization, (state, { payload }) => {
    state.isAuth = payload;
  });
});

export { reducer };
