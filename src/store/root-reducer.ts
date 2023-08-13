import { combineReducers } from '@reduxjs/toolkit';
import { ActionGroup } from '../const';
import { userProcess } from './user-process/user-process';
import { globalProcess } from './global-process/global-process';
import { citiesProcess } from './cities-process/cities-process';
import { offerProcess } from './offer-process/offer-process';
import { reviewsProcess } from './reviews-process/reviews-process';
import { favoritesProcess } from './favorites-process/favorites-process';

export const rootReducer = combineReducers({
  [ActionGroup.Global]: globalProcess.reducer,
  [ActionGroup.Cities]: citiesProcess.reducer,
  [ActionGroup.Offer]: offerProcess.reducer,
  [ActionGroup.Reviews]: reviewsProcess.reducer,
  [ActionGroup.Favorites]: favoritesProcess.reducer,
  [ActionGroup.User]: userProcess.reducer
});
