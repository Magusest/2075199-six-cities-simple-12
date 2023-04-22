import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute, AuthorizationStatus} from 'const';
import {AppDispatch, State} from 'types/state';
import { UserData } from 'types/user-data';
import { AuthData } from 'types/auth-data';
import Token from 'services/token';
import { setAuthorizationStatus, setUserData } from './actions';


export const checkAuthStatus = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(setUserData(data));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  });

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    Token.save(data.token);
    dispatch(setUserData(data));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    Token.drop();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
);

