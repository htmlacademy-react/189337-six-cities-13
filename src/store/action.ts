import {createAction} from '@reduxjs/toolkit';
import {ActionGroup, AppRoute} from '../const';

export const redirectToRoute = createAction<AppRoute>(`${ActionGroup.Global}/redirectToRoute`);
