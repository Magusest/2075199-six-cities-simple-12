import { createReducer } from '@reduxjs/toolkit';
import { updateOffers, changeCity, hovereCard, sortOffers, loadOffers } from './actions';
import { defaultCity, DEFAULT_SORTING, DEFAULT_SELECTED_CARD } from 'const';
import { offers } from 'mocks/offers';

// const {log} = console;

const initialState = {
  city: defaultCity,
  rooms: offers.filter((offer) => offer.city.name === defaultCity.name),
  sorting: DEFAULT_SORTING,
  hoveredCard: DEFAULT_SELECTED_CARD,
  countRooms: offers.filter((offer) => offer.city.name === defaultCity.name).length,

};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, actions) => {
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
    })
    .addCase(hovereCard, (state, actions) => {
      state.hoveredCard = actions.payload;
    })
    .addCase(sortOffers, (state, actions) => {
      const {checkedSorting} = actions.payload;
      state.sorting = checkedSorting;

      state.rooms = state.rooms.sort((a, b) => {
        switch (state.sorting) {
          case 'Price: high to low':
            return b.price - a.price;
          case 'Price: low to high':
            return a.price - b.price;
          case 'Top rated first':
            return b.rating - a.rating;
          default:
            return 0;
        }
      }
      );
    })
    .addCase(updateOffers, (state) => {
      state.rooms = offers.filter((offer) => offer.city.name === defaultCity.name);
    })
    .addCase(loadOffers, (state, actions) => {
      state.rooms = actions.payload;
    });
});
