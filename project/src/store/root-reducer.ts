import { combineReducers } from '@reduxjs/toolkit';
import { offersReducer } from './offers/reducer';
import { userReducer } from './user/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  offers: offersReducer,
});
