import { createAction } from '@reduxjs/toolkit';
import { Cities } from '../types/city';
import { Offer } from '../types/offers';
import { SortingType } from '../types/state';

export const changeActiveCity = createAction<Cities>('main/changeActiveCity');

export const selectOffer = createAction<Offer | null>('main/selectOffer');

export const toggleSortingMenu = createAction<boolean>('main/toggleSortingMenu');

export const changeActiveSort = createAction<SortingType>('main/changeActiveSort');
