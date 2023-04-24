import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultCity, DEFAULT_SORTING, DEFAULT_SELECTED_CARD, NameSpace, sortingOptions } from 'const';
import { City, Offers, Offer } from 'types/offers';
import { Reviews } from 'types/reviews';
import { fetchChosenOffer, fetchOffers, sendReviewAction } from './api-actions';


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
    isError: boolean;
  };
  review: {
    isSending: boolean;
    isSendError: boolean;
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
    isError: false,

  },
  review: {
    isSending: false,
    isSendError: false,
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
      return sOffers.sort((a, b) => b.rating - a.rating);
    default:
      return sOffers.sort((a, b) => a.id - b.id);
  }
};

const sortingComments = (comments: Reviews) => {
  comments.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  }).slice(0, 10);
  return comments;
};

export const offersReducer = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeCity: (state, actions: PayloadAction<string>) => {
      if (actions.payload) {
        state.sorting = DEFAULT_SORTING;
        state.city.name = actions.payload;
        state.offers.currentOffers = state.offers.allOffers.filter((offer) => offer.city.name === actions.payload);
        if (state.offers.currentOffers.length !== 0) {
          const room = state.offers.currentOffers[0];
          state.city = room.city;
        }
      }
    },
    hoverCard: (state, actions: PayloadAction<number>) => {
      state.hoveredCard = actions.payload;
    },
    sortOffers: (state, actions: PayloadAction<{checkedSorting: string}>) => {
      state.sorting = actions.payload.checkedSorting;
      sortingOffers(state.sorting, state.offers.currentOffers);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.offers.isLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, actions) => {
        state.offers.allOffers = actions.payload;
        state.offers.currentOffers = state.offers.allOffers.filter((offer) => offer.city.name === state.city.name);
        state.offers.isLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.offers.isLoading = true;
      })
      .addCase(fetchChosenOffer.pending, (state) => {
        state.chosenOffer.isLoading = true;
        state.chosenOffer.isError = false;
      })
      .addCase(fetchChosenOffer.fulfilled, (state, actions) => {
        const [chosenOffer, nearbyOffers, comments] = actions.payload;
        state.chosenOffer.offer = chosenOffer;
        state.chosenOffer.nearbyOffers = nearbyOffers;
        state.chosenOffer.comments = comments;
        state.chosenOffer.isLoading = false;
      })
      .addCase(fetchChosenOffer.rejected, (state) => {
        state.chosenOffer.isError = true;
        state.chosenOffer.isLoading = false;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.review.isSending = true;
      })
      .addCase(sendReviewAction.fulfilled, (state, actions) => {
        state.chosenOffer.comments = sortingComments(actions.payload);
        state.review.isSending = false;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.review.isSendError = true;
        state.review.isSending = false;
      });
  }
});

export const {changeCity, hoverCard, sortOffers} = offersReducer.actions;
// export const offersReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(initialLoading, (state) => {
//       state.offers.isLoading = true;
//     })
//     .addCase(loadOffers, (state, actions) => {
//       state.offers.allOffers = actions.payload;
//       state.offers.currentOffers = state.offers.allOffers.filter((offer) => offer.city.name === state.city.name);
//       state.offers.isLoading = false;
//     })
//     .addCase(changeCity, (state, actions) => {
//       if (actions.payload) {
//         state.sorting = DEFAULT_SORTING;
//         state.city.name = actions.payload;
//         state.offers.currentOffers = state.offers.allOffers.filter((offer) => offer.city.name === actions.payload);

//         if (state.offers.currentOffers.length !== 0) {
//           const room = state.offers.currentOffers[0];
//           state.city = room.city;
//         }
//       }
//       return state;
//     })
//     .addCase(hovereCard, (state, actions) => {
//       state.hoveredCard = actions.payload;
//     })
//     .addCase(sortOffers, (state, actions) => {
//       state.sorting = actions.payload.checkedSorting;
//       sortingOffers(state.sorting, state.offers.currentOffers);
//     })
//     .addCase(loadChosenOffer, (state, action) => {
//       state.chosenOffer.offer = action.payload;
//     })
//     .addCase(loadNearbyOffer, (state, actions) => {
//       state.chosenOffer.nearbyOffers = actions.payload;
//     })
//     .addCase(loadOfferComments, (state, actions) => {
//       state.chosenOffer.comments = actions.payload;
//     });
// });
