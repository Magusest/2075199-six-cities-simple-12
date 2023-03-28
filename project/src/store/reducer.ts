import { createReducer } from '@reduxjs/toolkit';
import { changeCity } from './actions';
import { defaultCity } from 'const';
import { offers } from 'mocks/offers';

// const {log} = console;

const initialState = {
  city: defaultCity,
  rooms: offers,
  countRooms: offers.filter((offer) => offer.city.name === defaultCity.name).length,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state = initialState, actions) => {
      if (actions.payload) {
        state.city.name = actions.payload;
        state.rooms = offers.filter((offer) => offer.city.name === actions.payload);
        state.countRooms = state.rooms.length;

        if (state.rooms.length !== 0) {
          const room = state.rooms[0];
          state.city = room.city;
        }
      }
      return state;
    });
});
