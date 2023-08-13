import { ActionGroup, SortingTypes } from '../const';
import { store } from '../store';
import { CitiesProcess } from './city';
import { GlobalProcess } from './global';
import { FavoritesProcess, OfferProcess } from './offers';
import { ReviewsProcess } from './review';
import { UserProcess } from './user';

export type SortingType = typeof SortingTypes[keyof typeof SortingTypes]

export type State = {
  [ActionGroup.Global]: GlobalProcess;
  [ActionGroup.Cities]: CitiesProcess;
  [ActionGroup.Offer]: OfferProcess;
  [ActionGroup.Reviews]: ReviewsProcess;
  [ActionGroup.Favorites]: FavoritesProcess;
  [ActionGroup.User]: UserProcess;
}

export type Selector = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
