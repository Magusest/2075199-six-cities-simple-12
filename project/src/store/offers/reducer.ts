import { createReducer } from '@reduxjs/toolkit';
import { defaultCity, DEFAULT_SORTING, DEFAULT_SELECTED_CARD, sortingOptions } from 'const';
import { City, Offers, Offer } from 'types/offers';
import { Reviews } from 'types/reviews';
import { changeCity, hovereCard, sortOffers, loadOffers, initialLoading, loadChosenOffer, loadNearbyOffer, loadOfferComments } from './actions';

const {log} = console;

type InitialState = {
  offers: {
    allOffers: Offers;
    currentOffers: Offers;
    isLoading: boolean;
  };
  chosenOffer: {
    offer: Offer | null;
    nearbyOffers: Offers;
    comments: Reviews;
    isLoading: boolean;
  };
  city: City;
  hoveredCard: number;
  sorting: string;
  error: string | null;
}

const initialState: InitialState = {
  offers: {
    allOffers: [],
    currentOffers: [],
    isLoading: false,
  },
  chosenOffer: {
    offer: null,
    nearbyOffers: [],
    comments: [],
    isLoading: false,
  },
  city: defaultCity,
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
      state.offers.isLoading = true;
    })
    .addCase(loadOffers, (state, actions) => {
      state.offers.isLoading = false;
      state.offers.allOffers = actions.payload;
      state.offers.currentOffers = state.offers.allOffers.filter((offer) => offer.city.name === state.city.name);
    })
    .addCase(changeCity, (state, actions) => {
      if (actions.payload) {
        state.sorting = DEFAULT_SORTING;
        state.city.name = actions.payload;
        state.offers.currentOffers = state.offers.allOffers.filter((offer) => offer.city.name === actions.payload);

        if (state.offers.currentOffers.length !== 0) {
          const room = state.offers.currentOffers[0];
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
      sortingOffers(state.sorting, state.offers.currentOffers);
    })
    .addCase(loadChosenOffer, (state, action) => {
      state.chosenOffer.offer = action.payload;
    })
    .addCase(loadNearbyOffer, (state, actions) => {
      state.chosenOffer.nearbyOffers = actions.payload;
      log(state.chosenOffer.nearbyOffers);
    })
    .addCase(loadOfferComments, (state, actions) => {
      state.chosenOffer.comments = actions.payload;
      log(state.chosenOffer.comments);
    });
});
