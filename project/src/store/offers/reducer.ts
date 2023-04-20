import { createReducer } from '@reduxjs/toolkit';
import { defaultCity, DEFAULT_SORTING, DEFAULT_SELECTED_CARD } from 'const';
import { City, Offers, Offer } from 'types/offers';
import { changeCity, hovereCard, sortOffers, loadOffers, setRoomsLoadingStatus, loadChosenOffer } from './actions';

type InitialState = {
  isOffersLoading: boolean;
  allOffers: Offers;
  city: City;
  currentOffers: Offers;
  chosenOffer: Offer | null;
  hoveredCard: number;
  sorting: string;
  error: string | null;
}

const initialState: InitialState = {
  isOffersLoading: false,
  allOffers: [],
  city: defaultCity,
  currentOffers: [],
  chosenOffer: null,
  sorting: DEFAULT_SORTING,
  hoveredCard: DEFAULT_SELECTED_CARD,
  error: null,
};

const {log} = console;

export const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setRoomsLoadingStatus, (state, actions) => {
      state.isOffersLoading = actions.payload;
    })
    .addCase(loadOffers, (state, actions) => {
      state.allOffers = actions.payload;
      state.currentOffers = state.allOffers.filter((offer) => offer.city.name === state.city.name);
    })
    .addCase(changeCity, (state, actions) => {
      if (actions.payload) {
        state.city.name = actions.payload;
        state.currentOffers = state.allOffers.filter((offer) => offer.city.name === actions.payload);
        log(state.currentOffers);

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
      // Спросить про сортировку (не сортируется в первоночльнос порядке)
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
    .addCase(loadChosenOffer, (state, action) => {
      state.chosenOffer = action.payload;
    });
});
