import { createReducer } from '@reduxjs/toolkit';
import { testAction } from './action';

const initialState = {};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(testAction, (state) => state);
});

export { reducer };
