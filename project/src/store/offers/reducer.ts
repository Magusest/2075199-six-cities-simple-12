import { createReducer } from '@reduxjs/toolkit';
import { defaultCity, DEFAULT_SORTING, DEFAULT_SELECTED_CARD, sortingOptions } from 'const';
import { City, Offers, Offer } from 'types/offers';
import { changeCity, hovereCard, sortOffers, loadOffers, initialLoading, loadChosenOffer } from './actions';

const {log} = console;

type InitialState = {
  Offers: {
    allOffers: Offers;
    currentOffers: Offers;
    isLoading: boolean;
  };
  city: City;
  chosenOffer: Offer | null;
  hoveredCard: number;
  sorting: string;
  error: string | null;
}

const initialState: InitialState = {
  Offers: {
    allOffers: [],
    currentOffers: [],
    isLoading: false,
  },
  city: defaultCity,
  chosenOffer: null,
  sorting: DEFAULT_SORTING,
  hoveredCard: DEFAULT_SELECTED_CARD,
  error: null,
};

const sortingOffers = (type: string, sOffers: Offers)=> {
  switch (type) {
    case sortingOptions.HightToLow:
      return sOffers.sort((a, b) => b.price - a.price);
    case sortingOptions.lowToHigh:
      return sOffers.sort((a, b) => a.price - b.price);
    case sortingOptions.raitedTop:
      log(sOffers.length);
      return sOffers.sort((a, b) => b.rating - a.rating);
    default:
      return sOffers.sort((a, b) => a.id - b.id);
  }
};

export const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(initialLoading, (state) => {
      state.Offers.isLoading = true;
    })
    .addCase(loadOffers, (state, actions) => {
      state.Offers.isLoading = false;
      state.Offers.allOffers = actions.payload;
      state.Offers.currentOffers = state.Offers.allOffers.filter((offer) => offer.city.name === state.city.name);
    })
    .addCase(changeCity, (state, actions) => {
      if (actions.payload) {
        state.sorting = DEFAULT_SORTING;
        state.city.name = actions.payload;
        state.Offers.currentOffers = state.Offers.allOffers.filter((offer) => offer.city.name === actions.payload);

        if (state.Offers.currentOffers.length !== 0) {
          const room = state.Offers.currentOffers[0];
          state.city = room.city;
        }
      }
      return state;
    })
    .addCase(hovereCard, (state, actions) => {
      state.hoveredCard = actions.payload;
    })
    .addCase(sortOffers, (state, actions) => {
      state.sorting = actions.payload.checkedSorting;
      sortingOffers(state.sorting, state.Offers.currentOffers);
    })
    .addCase(loadChosenOffer, (state, action) => {
      state.chosenOffer = action.payload;
    });
});
