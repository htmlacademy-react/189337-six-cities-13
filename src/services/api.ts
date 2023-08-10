import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './token';
import { ToastPosition, toast } from 'react-toastify';
import { APIRoute, GLOBAL_TOAST_ID, StatusCodeError } from '../const';
import { DetailMessageType } from '../types/api';
import { store } from '../store';
import { setLoading } from '../store/action';

const BACKEND_URL = 'https://13.design.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const TOAST_POSITION: ToastPosition = 'top-center';

const getErrorText = ({ message, response, request: { url, method } }: AxiosError<DetailMessageType>): string => {
  let out = '';
  if (response && StatusCodeError[response.status]) {
    const { data } = response;
    switch (url) {
      case APIRoute.Login:
        if (method === 'post') {
          out = data.message;
        }
        break;
      default:
        out = data.message;
        break;
    }
  } else {
    out = message;
  }
  return out;
};

export const createAPI = (): AxiosInstance => {

  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['X-Token'] = token;
      }
      store.dispatch(setLoading(true));
      return config;
    },
    (error: AxiosError) => {
      store.dispatch(setLoading(false));
      throw error;
    }
  );

  api.interceptors.response.use(
    (response) => {
      store.dispatch(setLoading(false));
      return response;
    },
    (error: AxiosError<DetailMessageType>) => {
      const errorText = getErrorText(error);
      if (errorText !== '') {
        toast.error(errorText, {
          position: TOAST_POSITION,
          toastId: GLOBAL_TOAST_ID
        });
      }
      store.dispatch(setLoading(false));
      throw error;
    }
  );

  return api;
};
