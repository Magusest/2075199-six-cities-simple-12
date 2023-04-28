import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute, AppRoute} from 'const';
import {AppDispatch, State} from 'types/state';
import { UserData } from 'types/user-data';
import { AuthData } from 'types/auth-data';
import Token from 'services/token';
import { redirectToRoute } from 'store/actions';


export const checkAuthStatus = createAsyncThunk<
  UserData,
  undefined,
  {
    extra: AxiosInstance;
  }
>(
  'user/checkAuth',
  async (_arg, { extra: api}) => {
    const { data } = await api.get<UserData>(APIRoute.Login);

    return data;

  });

export const loginAction = createAsyncThunk<
  UserData,
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
    dispatch(redirectToRoute(AppRoute.Main));

    return data;
  }
);

export const logoutUserAction = createAsyncThunk<
  void,
  undefined,
  {
    extra: AxiosInstance;
  }
>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    Token.drop();
  }
);

