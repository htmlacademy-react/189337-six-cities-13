import { createAction } from '@reduxjs/toolkit';
import { Cities } from '../types/city';

export const changeActiveCity = createAction<Cities>('main/changeActiveCity');
