import { createSlice } from '@reduxjs/toolkit';
import { UserProcess } from '../../types/user';
import { ActionGroup, RequestStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-action';

const initialState: UserProcess = {
  isAuth: false,
  userInfo: null,
  fetch: {
    check: RequestStatus.Idle,
    login: RequestStatus.Idle,
    logout: RequestStatus.Idle
  },
};

export const userProcess = createSlice({
  name: ActionGroup.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, { payload }) => {
        state.fetch.check = RequestStatus.Success;
        state.userInfo = payload;
        state.isAuth = true;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.fetch.check = RequestStatus.Error;
        state.userInfo = null;
        state.isAuth = false;
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.fetch.check = RequestStatus.Success;
        state.userInfo = payload;
        state.isAuth = true;
      })
      .addCase(loginAction.rejected, (state) => {
        state.fetch.check = RequestStatus.Error;
      }).addCase(logoutAction.fulfilled, (state) => {
        state.fetch.logout = RequestStatus.Success;
        state.userInfo = null;
        state.isAuth = false;
      }).addCase(logoutAction.rejected, (state) => {
        state.fetch.logout = RequestStatus.Error;
      });
  }
});
