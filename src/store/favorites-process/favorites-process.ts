import { createSlice } from '@reduxjs/toolkit';
import { ActionGroup, RequestStatus } from '../../const';
import { fetchFavorites } from '../api-action';
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
      });
  }
});
