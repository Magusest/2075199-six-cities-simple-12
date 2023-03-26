import { createReducer } from '@reduxjs/toolkit';
import { changeCity } from './actions';
import { defaultCity } from 'const';
import { offers } from 'mocks/offers';

const initialState = {
  defaultCity: defaultCity,
  offers: offers,
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state) => {
      state.defaultCity = state.defaultCity;
    });
});

export {
  reducer
}
