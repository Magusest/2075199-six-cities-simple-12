import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from 'services/api';
import { AUTH_TOKEN_KEY_NAME } from 'services/token';
import { checkAuthStatus, loginAction, logoutUserAction } from './api-actions';
import { redirectToRoute } from '../actions';
import { APIRoute } from 'const';
import { State } from 'types/state';
import { AuthData } from 'types/auth-data';
import { makeFakeUser } from 'utils/mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch checkUserAction when server returns 200', async () => {
    const user = makeFakeUser();

    const store = mockStore();
    mockAPI.onGet(APIRoute.Login).reply(200, user);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(checkAuthStatus());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      checkAuthStatus.pending.type,
      checkAuthStatus.fulfilled.type,
    ]);
  });

  it('should dispatch checkUserAction when server returns 400', async () => {
    const user = {};

    const store = mockStore();
    mockAPI.onGet(APIRoute.Login).reply(400, user);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(checkAuthStatus());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      checkAuthStatus.pending.type,
      checkAuthStatus.rejected.type,
    ]);
  });

  it('should dispatch loginAction and redirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = { login: 'test@example.com', password: 't7t8t9' };

    mockAPI.onPost(APIRoute.Login).reply(200, { token: 'secret' });

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(
      AUTH_TOKEN_KEY_NAME,
      'secret'
    );
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI.onDelete(APIRoute.Logout).reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutUserAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logoutUserAction.pending.type,
      logoutUserAction.fulfilled.type,
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });
});
