import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute, ActionGroup, AppRoute, ReviewsConfig } from '../const.js';
import { Offer, OfferDetails } from '../types/offers.js';
import { AuthData, ReviewData } from '../types/api.js';
import { User } from '../types/user.js';
import { removeToken, saveToken } from '../services/token.js';
import { Review } from '../types/review.js';
import { resetSendCommentStatus } from './reviews-process/reviews-process.js';
import { redirectToRoute } from './action.js';
import { setLoaderIsActive } from './global-process/global-process.js';

export const fetchOffers = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.Data}/fetchOffers`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);


export const fetchOffersNearby = createAsyncThunk<Offer[], Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.Data}/fetchOffersNearby`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setLoaderIsActive(false));
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(setLoaderIsActive(true));
    return data;
  }
);

export const fetchReviews = createAsyncThunk<Review[], Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.Data}/fetchReviews`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setLoaderIsActive(false));
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    dispatch(setLoaderIsActive(true));
    return data;
  }
);

export const fetchOffer = createAsyncThunk<OfferDetails | null, Offer['id'], {
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
      return data;
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
      return null;
    }
  }
);


export const fetchFavorites = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.Data}/fetchFavorites`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorites);
    return data;
  }
);

export const addOfferToFavorites = createAsyncThunk<Offer, Offer | OfferDetails, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.User}/addOfferToFavorites`,
  async ({ id, isFavorite }, { extra: api }) => {
    const { data } = await api.post<Offer>(`${APIRoute.Favorites}/${id}/${+(!isFavorite)}`);
    return data;
  }
);


export const checkAuthAction = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.User}/checkAuth`,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<User>(APIRoute.Login);
    dispatch(fetchFavorites());
    return data;
  }
);

export const loginAction = createAsyncThunk<User, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.User}/login`,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<User>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(fetchFavorites());
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.User}/logout`,
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    removeToken();
  }
);

export const clearSendCommentStatus = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.User}/clearSendCommentStatus`,
  (_arg, { dispatch }) => {
    setTimeout(() => dispatch(resetSendCommentStatus()), ReviewsConfig.ClearCommentStatusTime);
  }
);

export const sendComment = createAsyncThunk<Review, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ActionGroup.User}/sendComment`,
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<Review>(`${APIRoute.Comments}/${id}`, { comment, rating });
      return data;
    } catch (error) {
      dispatch(clearSendCommentStatus());
      throw error;
    }
  }
);
