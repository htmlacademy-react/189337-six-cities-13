import { createReducer } from '@reduxjs/toolkit';
import { changeActiveCity } from './action';
import { State } from '../types/state';

const initialState: State = {
  activeCity: 'Amsterdam'
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeActiveCity, (state, action) => {
    state.activeCity = action.payload;
  });
});

export { reducer };
