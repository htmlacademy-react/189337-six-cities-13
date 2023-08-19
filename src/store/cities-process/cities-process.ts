import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ActionGroup, CITIES, RequestStatus, SortingTypes } from '../../const';
import { addOfferToFavorites, fetchOffer, fetchOffers } from '../api-action';
import { Cities, CitiesProcess } from '../../types/city';
import { Offer } from '../../types/offers';
import { changeOfferIsFavorite, getOffersByActiveCity } from '../../cities';

const initialState: CitiesProcess = {
  activeCity: CITIES[0],
  cityInfo: null,
  offers: [],
  offersAll: [],
  offerSelected: null,
  sortingMenu: {
    visible: false,
    activeSort: SortingTypes.Popular
  },
  fetch: {
    offers: RequestStatus.Idle,
    addOfferToFavorites: RequestStatus.Idle
  }
};

export const citiesProcess = createSlice({
  name: ActionGroup.Cities,
  initialState,
  reducers: {
    changeActiveCity: (state, { payload }: PayloadAction<Cities>) => {
      state.activeCity = payload;
      state.offers = getOffersByActiveCity(state.offersAll, state.activeCity);
      if (state.offers.length) {
        state.cityInfo = state.offers[0].city;
      }
    },
    toggleSortingMenu: (state, { payload }: PayloadAction<boolean>) => {
      state.sortingMenu.visible = payload;
    },
    changeActiveSort: (state, { payload }: PayloadAction<SortingTypes>) => {
      state.sortingMenu.activeSort = payload;
    },
    setOfferSelected: (state, { payload }: PayloadAction<Offer | null>) => {
      state.offerSelected = payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.fulfilled, (state, { payload }) => {
        state.fetch.offers = RequestStatus.Success;
        state.offersAll = payload;
        state.offers = getOffersByActiveCity(state.offersAll, state.activeCity);
        if (state.offers.length) {
          state.cityInfo = state.offers[0].city;
        }
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.fetch.offers = RequestStatus.Error;
      }).addCase(addOfferToFavorites.fulfilled, (state, { payload: { id, isFavorite } }) => {
        state.fetch.addOfferToFavorites = RequestStatus.Success;
        state.offers = changeOfferIsFavorite(state.offers, id, isFavorite);
      })
      .addCase(addOfferToFavorites.rejected, (state) => {
        state.fetch.addOfferToFavorites = RequestStatus.Error;
      })
      .addCase(fetchOffer.fulfilled, (state, { payload }) => {
        state.offerSelected = payload;
      });
  }
});

export const { changeActiveCity, toggleSortingMenu, changeActiveSort, setOfferSelected } = citiesProcess.actions;
