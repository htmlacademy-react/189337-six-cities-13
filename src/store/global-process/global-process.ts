import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ActionGroup } from '../../const';
import { GlobalProcess } from '../../types/global';

const initialState: GlobalProcess = {
  isLoading: false
};

export const globalProcess = createSlice({
  name: ActionGroup.Global,
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    }
  }
});

export const { setIsLoading } = globalProcess.actions;
