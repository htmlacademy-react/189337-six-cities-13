import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute, ActionGroup, AppRoute } from '../const.js';
import { Offer, OfferDetails } from '../types/offers.js';
import { loadFavorites, loadOffers, requireAuthorization, addToFavorite, loadOffer, loadOffersNearby, redirectToRoute, loadReviews } from './action.js';
import { AuthData, ReviewData } from '../types/api.js';
import { User } from '../types/user.js';
import { dropToken, saveToken } from '../services/token.js';
import { Review } from '../types/review.js';

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


export const fetchOffersNearby = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.Data}/fetchOffersNearby`,
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(loadOffersNearby(data));
  },
);

export const fetchReviews = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.Data}/fetchReviews`,
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    dispatch(loadReviews(data));
  },
);

export const fetchOffer = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.Data}/fetchOffer`,
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<OfferDetails>(`${APIRoute.Offers}/${id}`);
      dispatch(fetchOffersNearby(id));
      dispatch(fetchReviews(id));
      dispatch(loadOffer(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
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

export const setOfferIsFavorite = createAsyncThunk<void, Offer | OfferDetails, {
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

export const sendComment = createAsyncThunk<void, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.User}/sendComment`,
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    await api.post(`${APIRoute.Comments}/${id}`, { comment, rating });
    dispatch(fetchReviews(id));
  },
);
