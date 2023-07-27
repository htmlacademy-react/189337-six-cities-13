import { store } from '../store';
import { Cities } from './city';

export type State = {
  activeCity: Cities;
}

export type Selector = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
