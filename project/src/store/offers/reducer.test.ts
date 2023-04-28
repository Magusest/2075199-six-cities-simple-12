import { initialState, offersReducer } from './reducer';
import { Offer, Offers } from 'types/offers';
import { Reviews } from 'types/reviews';
import { makeFakeOffer, makeFakeOffers, makeFakeReviews } from 'utils/mocks';
import { fetchOffers, fetchChosenOffer, sendReviewAction } from './api-actions';

const offer = makeFakeOffer();
const offers = makeFakeOffers(3);

const targetOffer = offer;
const nearbyOffers = offers;
const reviews = makeFakeReviews();
const targetOfferPayload: [Offer, Offers, Reviews] = [
  targetOffer,
  nearbyOffers,
  reviews,
];

describe('Reducer: offersData', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersReducer.reducer(undefined, { type: 'UNKNOWN_ACTION' })
    ).toEqual(initialState);
  });

  it('should set isLoading to "true" before receiving offers', () => {
    expect(
      offersReducer.reducer(initialState, { type: fetchOffers.pending.type }).offers
    ).toEqual({ ...initialState.offers, isLoading: true });
  });

  it('should set isDataLoading to "false" on offers rejected', () => {
    expect(
      offersReducer.reducer(initialState, {
        type: fetchOffers.rejected.type,
      }).offers
    ).toEqual({ ...initialState.offers, isLoading: true });
  });

  it('should set isInitial to "true" and isDataLoading to "true" when pending before receiving targetOffer', () => {
    expect(
      offersReducer.reducer(initialState, { type: fetchChosenOffer.pending.type }).chosenOffer
    ).toEqual({ ...initialState.chosenOffer, isLoading: true });
  });

  it('should set targetOffer, nearbyOffers, reviews and isDataLoading to "false"', () => {
    expect(offersReducer.reducer(initialState, {
      type: fetchChosenOffer.fulfilled.type,
      payload: targetOfferPayload,
    }).chosenOffer
    ).toEqual({
      ...initialState.chosenOffer,
      offer,
      nearbyOffers,
      comments: reviews,
      isLoading: false,
    });
  });

  it('should set isError to "true" and isDataLoading to "false" on targetOffer rejected', () => {
    expect(
      offersReducer.reducer(initialState, { type: fetchChosenOffer.rejected.type }).chosenOffer
    ).toEqual({ ...initialState.chosenOffer, isError: true, isLoading: false });
  });

  it('should set isSending to "true" pending review', () => {
    expect(
      offersReducer.reducer(initialState, { type: sendReviewAction.pending.type }).review
    ).toEqual({ ...initialState.review, isSending: true });
  });

  it('should set isSendError to "true" and isSending to "false" on review rejected', () => {
    expect(
      offersReducer.reducer(initialState, { type: sendReviewAction.rejected.type }).review
    ).toEqual({ isSendError: true, isSending: false });
  });
});
