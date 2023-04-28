import { AnyAction } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import { redirectToRoute } from '../actions';
import { AppRoute } from 'const';
import { State } from 'types/state';

const fakeHistory = {
  location: { pathname: '' },
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should redirect to /', () => {
    store.dispatch(redirectToRoute(AppRoute.Main));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Main);
    expect(store.getActions()).toEqual([redirectToRoute(AppRoute.Main)]);
  });

  it('should not redirect to / because of bad action', () => {
    store.dispatch({ type: 'UNKNOWN_ACTION', payload: AppRoute.Main });
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Main);
  });
});
