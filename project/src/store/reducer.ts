import { createReducer } from '@reduxjs/toolkit';
import { City, Offers } from 'types/offers';
import { changeCity, hovereCard, sortOffers, loadOffers, setRoomsLoadingStatus, setAuthorizationStatus, setUserData } from './actions';
import { defaultCity, DEFAULT_SORTING, DEFAULT_SELECTED_CARD, AuthorizationStatus } from 'const';
import { UserData } from 'types/user-data';

const {log} = console;

type InitialState = {
  city: City;
  currentOffers: Offers;
  allOffers: Offers;
  sorting: string;
  hoveredCard: number;
  isOffersLoading: boolean;
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  userData: UserData;
}

const initialState: InitialState = {
  city: defaultCity,
  currentOffers: [],
  allOffers: [],
  sorting: DEFAULT_SORTING,
  hoveredCard: DEFAULT_SELECTED_CARD,
  isOffersLoading: false,
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {
    avatarUrl: '',
    id: 1,
    isPro: false,
    name: '',
    email: '',
    token: '',
  }
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, actions) => {
      if (actions.payload) {
        state.city.name = actions.payload;
        state.currentOffers = state.allOffers.filter((offer) => offer.city.name === actions.payload);

        if (state.currentOffers.length !== 0) {
          const room = state.currentOffers[0];
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

      state.currentOffers = state.currentOffers.sort((a, b) => {
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
      state.allOffers = actions.payload;
      state.currentOffers = state.allOffers.filter((offer) => offer.city.name === state.city.name);
    })
    .addCase(setRoomsLoadingStatus, (state, actions) => {
      state.isOffersLoading = actions.payload;
    })
    .addCase(setAuthorizationStatus, (status, actions) => {
      status.authorizationStatus = actions.payload;
    })
    .addCase(setUserData, (state, actions) => {
      state.userData = actions.payload;
      log(state.userData);
    });
});
