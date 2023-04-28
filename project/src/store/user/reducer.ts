import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from 'const';
import { UserData } from 'types/user-data';
import { loginAction, logoutUserAction, checkAuthStatus } from './api-actions';

// const {log} = console;

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  isChecking: boolean;
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  isChecking: false,
};

export const userReducer = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutUserAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
        state.isChecking = false;
      })
      .addCase(checkAuthStatus.pending, (state) => {
        state.isChecking = true;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isChecking = false;
      });
  },
});
