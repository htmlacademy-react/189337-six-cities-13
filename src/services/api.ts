import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from './token';
import { ToastPosition, toast } from 'react-toastify';
import { StatusCodeError } from '../const';
import { DetailMessageType } from '../types/api';
import { store } from '../store';
import { setLoading } from '../store/action';

const BACKEND_URL = 'https://13.design.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const TOAST_POSITION: ToastPosition = 'top-center';

const shouldDisplayError = (response: AxiosResponse): boolean => !!StatusCodeError[response.status];

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
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);

        toast.error(detailMessage.message, {
          position: TOAST_POSITION
        });
      }
      store.dispatch(setLoading(false));
      throw error;
    }
  );

  return api;
};
