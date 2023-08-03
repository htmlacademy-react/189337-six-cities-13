import { createReducer } from '@reduxjs/toolkit';
import { addToFavorite, changeActiveCity, changeActiveSort, loadFavorites, loadOffers, requireAuthorization, selectOffer, setLoading, toggleSortingMenu } from './action';
import { State } from '../types/state';
import { getGroupOffersByCity, sortOffers } from '../cities';
import { offers } from '../mocks/offers';
import { SortingTypes } from '../const';


const initialState: State = {
  activeCity: 'Paris',
  offers: [],
  groupOffers: null,
  groupOffersByCity: getGroupOffersByCity(offers),
  favorites: [],
  selectedOffer: null,
  sortingMenu: {
    visible: false,
    activeSort: SortingTypes.Popular
  },
  auth: {
    isAuth: false,
    user: null
  },
  isLoading: false
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
    state.groupOffers = sortOffers(state.groupOffersByCity[state.activeCity], state.sortingMenu.activeSort);
  }).addCase(loadOffers, (state, { payload }) => {
    state.offers = payload;
    state.groupOffersByCity = getGroupOffersByCity(payload);
    state.groupOffers = sortOffers(state.groupOffersByCity[state.activeCity], state.sortingMenu.activeSort);
  }).addCase(requireAuthorization, (state, { payload }) => {
    state.auth.isAuth = !!payload;
    state.auth.user = payload;
  }).addCase(setLoading, (state, { payload }) => {
    state.isLoading = payload;
  }).addCase(loadFavorites, (state, { payload }) => {
    state.favorites = payload;
  }).addCase(addToFavorite, (state, { payload }) => {
    const offer = state.offers.find(({ id }) => id === payload.id);
    if(offer) {
      offer.isFavorite = payload.isFavorite;
      state.groupOffersByCity = getGroupOffersByCity(state.offers);
      state.groupOffers = sortOffers(state.groupOffersByCity[state.activeCity], state.sortingMenu.activeSort);
    }
  });
});

export { reducer };
