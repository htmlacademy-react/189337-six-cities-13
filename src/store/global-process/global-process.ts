import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ActionGroup } from '../../const';
import { GlobalProcess } from '../../types/global';

const initialState: GlobalProcess = {
  isLoading: false,
  loaderIsActive: true
};

export const globalProcess = createSlice({
  name: ActionGroup.Global,
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload && state.loaderIsActive;
    },
    setLoaderIsActive: (state, { payload }: PayloadAction<boolean>) => {
      state.loaderIsActive = payload;
    },
  }
});

export const { setIsLoading, setLoaderIsActive } = globalProcess.actions;
