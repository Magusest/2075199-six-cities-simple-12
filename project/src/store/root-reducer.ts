import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from 'const';
import { offersReducer } from './offers/reducer';
import { userReducer } from './user/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  [NameSpace.Data]: offersReducer.reducer,
});
