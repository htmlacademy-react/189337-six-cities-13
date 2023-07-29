import { createAction } from '@reduxjs/toolkit';
import { Cities } from '../types/city';
import { Offer } from '../types/offers';

export const changeActiveCity = createAction<Cities>('main/changeActiveCity');

export const selectOffer = createAction<Offer | null>('main/selectOffer');
