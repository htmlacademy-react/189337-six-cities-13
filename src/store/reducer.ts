import { createReducer } from '@reduxjs/toolkit';
import { addToFavorite, changeActiveCity, changeActiveSort, loadFavorites, loadOffer, loadOffers, loadOffersNearby, loadReviews, requireAuthorization, selectOffer, setLoading, toggleSortingMenu } from './action';
import { State } from '../types/state';
import { changeOfferIsFavorite, getGroupOffersByCity, getRandomThreeElements, sortOffers } from '../cities';
import { offers } from '../mocks/offers';
import { NEARBY_OFFERS_COUNT_ON_OFFER_PAGE, SortingTypes } from '../const';


const initialState: State = {
  activeCity: 'Paris',
  offers: [],
  offer: null,
  offersNearby: [],
  groupOffers: null,
  groupOffersByCity: getGroupOffersByCity(offers),
  reviews: [],
  favorites: [],
  selectedOffer: null,
  sortingMenu: {
    visible: false,
    activeSort: SortingTypes.Popular
  },
  auth: {
    isAuth: false,
    isLoading: true,
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
  }).addCase(loadOffer, (state, { payload }) => {
    state.offer = payload;
  }).addCase(loadOffersNearby, (state, { payload }) => {
    state.offersNearby = getRandomThreeElements(payload, NEARBY_OFFERS_COUNT_ON_OFFER_PAGE);
  }).addCase(requireAuthorization, (state, { payload }) => {
    state.auth.isAuth = !!payload;
    state.auth.user = payload;
    state.auth.isLoading = false;
  }).addCase(setLoading, (state, { payload }) => {
    state.isLoading = payload;
  }).addCase(loadFavorites, (state, { payload }) => {
    state.favorites = payload;
  }).addCase(loadReviews, (state, { payload }) => {
    state.reviews = payload;
  }).addCase(addToFavorite, (state, { payload: { id, isFavorite } }) => {
    state.offers = changeOfferIsFavorite(state.offers, id, isFavorite);
    state.offersNearby = changeOfferIsFavorite(state.offersNearby, id, isFavorite);
    state.groupOffersByCity = getGroupOffersByCity(state.offers);
    state.groupOffers = sortOffers(state.groupOffersByCity[state.activeCity], state.sortingMenu.activeSort);
    if(state.offer) {
      state.offer.isFavorite = isFavorite;
    }
  });
});

export { reducer };
