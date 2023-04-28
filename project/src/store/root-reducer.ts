import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from 'const';
import { offersReducer } from './offers/reducer';
import { userReducer } from './user/reducer';

export const rootReducer = combineReducers({
  [NameSpace.User]: userReducer.reducer,
  [NameSpace.Data]: offersReducer.reducer,
});
