import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute, ActionGroup } from '../const.js';
import { Offer, OfferDetails } from '../types/offers.js';
import { loadFavorites, loadOffers, requireAuthorization, addToFavorite } from './action.js';
import { AuthData } from '../types/api.js';
import { User } from '../types/user.js';
import { dropToken, saveToken } from '../services/token.js';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.Data}/fetchOffers`,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
  },
);

export const fetchFavorites = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.Data}/fetchFavorites`,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorites);
    dispatch(loadFavorites(data));
  },
);

export const setOfferIsFavorite = createAsyncThunk<void, Offer, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.User}/setOfferIsFavorite`,
  async ({ id, isFavorite }, { dispatch, extra: api }) => {
    const { data } = await api.post<OfferDetails>(`${APIRoute.Favorites}/${id}/${+(!isFavorite)}`);
    dispatch(addToFavorite(data));
    dispatch(fetchFavorites());
  },
);


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.User}/checkAuth`,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<User>(APIRoute.Login);
      dispatch(requireAuthorization(data));
      dispatch(fetchFavorites());
    } catch {
      dispatch(requireAuthorization(null));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.User}/login`,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<User>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(requireAuthorization(data));
    dispatch(fetchFavorites());
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.User}/logout`,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(null));
  },
);
