import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './token';
import { ToastPosition, toast } from 'react-toastify';
import { APIRoute, GLOBAL_TOAST_ID, StatusCodeError } from '../const';
import { Api, DetailMessageType } from '../types/api';
const BACKEND_URL = 'https://13.design.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const TOAST_POSITION: ToastPosition = 'top-center';

const getErrorText = ({ message, response }: AxiosError<DetailMessageType>): string => {
  let out = '';
  if (response && StatusCodeError[response.status]) {
    const { data, config } = response;
    const { url, method } = config;
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

export const createAPI = ({ setLoader }: Api = {}): AxiosInstance => {

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
      setLoader?.(true);
      return config;
    },
    (error: AxiosError) => {
      setLoader?.(false);
      throw error;
    }
  );

  api.interceptors.response.use(
    (response) => {
      setLoader?.(false);
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
      setLoader?.(false);
      throw error;
    }
  );

  return api;
};
