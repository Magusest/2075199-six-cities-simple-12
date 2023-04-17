import { createReducer } from '@reduxjs/toolkit';
import { City, Offers } from 'types/offers';
import { changeCity, hovereCard, sortOffers, loadOffers, setRoomsLoadingStatus } from './actions';
import { defaultCity, DEFAULT_SORTING, DEFAULT_SELECTED_CARD, AuthorizationStatus } from 'const';
// import { offers } from 'mocks/offers';

// const {log} = console;

type InitialState = {
  city: City;
  currentRooms: Offers;
  allRooms: Offers;
  sorting: string;
  hoveredCard: number;
  isRoomsLoading: boolean;
  error: string | null;
  authorizationStatus: AuthorizationStatus;
}

const initialState: InitialState = {
  city: defaultCity,
  currentRooms: [],
  allRooms: [],
  sorting: DEFAULT_SORTING,
  hoveredCard: DEFAULT_SELECTED_CARD,
  isRoomsLoading: false,
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, actions) => {
      if (actions.payload) {
        state.city.name = actions.payload;
        state.currentRooms = state.allRooms.filter((offer) => offer.city.name === actions.payload);

        if (state.currentRooms.length !== 0) {
          const room = state.currentRooms[0];
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

      state.currentRooms = state.currentRooms.sort((a, b) => {
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
    .addCase(loadOffers, (state, actions) => {
      state.allRooms = actions.payload;
      state.currentRooms = state.allRooms.filter((offer) => offer.city.name === state.city.name);
    })
    .addCase(setRoomsLoadingStatus, (state, actions) => {
      state.isRoomsLoading = actions.payload;
    });
});
