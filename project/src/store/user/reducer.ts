import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from 'const';
import { UserData } from 'types/user-data';
import { setAuthorizationStatus, setUserData } from './actions';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData;
}

const InitialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {
    avatarUrl: '',
    id: 1,
    isPro: false,
    name: '',
    email: '',
    token: '',
  },
};

export const userReducer = createReducer(InitialState, (builder) => {
  builder
    .addCase(setAuthorizationStatus, (status, actions) => {
      status.authorizationStatus = actions.payload;
    })
    .addCase(setUserData, (state, actions) => {
      state.userData = actions.payload;
    });
});
