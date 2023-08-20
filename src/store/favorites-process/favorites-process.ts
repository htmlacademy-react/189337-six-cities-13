import { createSlice } from '@reduxjs/toolkit';
import { ActionGroup, RequestStatus } from '../../const';
import { addOfferToFavorites, fetchFavorites } from '../api-action';
import { FavoritesProcess } from '../../types/offers';

const initialState: FavoritesProcess = {
  favorites: [],
  fetch: {
    favorites: RequestStatus.Idle
  }
};

export const favoritesProcess = createSlice({
  name: ActionGroup.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavorites.fulfilled, (state, { payload }) => {
        state.fetch.favorites = RequestStatus.Success;
        state.favorites = payload;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.fetch.favorites = RequestStatus.Error;
      })
      .addCase(addOfferToFavorites.fulfilled, (state, { payload }) => {
        const { id, isFavorite } = payload;
        if(!isFavorite) {
          state.favorites = state.favorites.filter((offer) => offer.id !== id);
        } else {
          state.favorites.push(payload);
        }
      });
  }
});
