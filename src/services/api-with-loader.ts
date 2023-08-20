import { setIsLoading } from '../store/global-process/global-process';
import { store } from '../store';
import { Api } from '../types/api';
import { createAPI } from './api';
import { AxiosInstance } from 'axios';

const setLoader: Api['setLoader'] = (isActive) => {
  store.dispatch(setIsLoading(isActive));
};

const createAPIWithLoader = (): AxiosInstance => createAPI({ setLoader });

export default createAPIWithLoader;
