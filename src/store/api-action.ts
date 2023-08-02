import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute, ActionGroup } from '../const.js';
import { Offer } from '../types/offers.js';
import { loadOffers, requireAuthorization } from './action.js';
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
