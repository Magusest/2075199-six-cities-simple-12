import { Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from 'browser-history';
import { rootReducer } from '../root-reducer';
import { REDIRECT_ACTION } from 'store/actions';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) => (next) => (action: PayloadAction<string>) => {
    if (action.type === REDIRECT_ACTION) {
      browserHistory.push(action.payload);
    }
    return next(action);
  };
