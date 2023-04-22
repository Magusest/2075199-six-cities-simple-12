import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from 'const';
import {AppDispatch, State} from 'types/state';
import { Offers, Offer } from 'types/offers.js';
import { loadChosenOffer, loadOffers, initialLoading, loadNearbyOffer, loadOfferComments } from './actions';
import { ReviewData, Reviews } from 'types/reviews';

export const fetchOffers = createAsyncThunk<
  void,
  undefined,
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(initialLoading());
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffers(data));

  }
);

export const fetchChosenOffer = createAsyncThunk<
  void,
  Offer['id'],
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
>(
  'data/fetchChosenOffer',
  async (cardId, {dispatch, extra: api}) => {
    const [offer, nearbyOffers, comments] = await Promise.all([
      api.get<Offer>(`${APIRoute.Offers}/${cardId}`),
      api.get<Offers>(`${APIRoute.Offers}/${cardId}/nearby`),
      api.get<Reviews>(`${APIRoute.Comments}/${cardId}`)
    ]);
    dispatch(initialLoading());
    dispatch(loadChosenOffer(offer.data));
    dispatch(loadNearbyOffer(nearbyOffers.data));
    dispatch(loadOfferComments(comments.data));
  }
);

export const sendReviewAction = createAsyncThunk<
  void,
  {
    rating: ReviewData['rating'];
    review: ReviewData['review'];
    offerId: Offer['id'];
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/sendReviewAction',
  async (
    {rating, review: comment, offerId: cardId},{dispatch, extra: api}
  ) => {
    const { data } = await api.post<Reviews>(`${APIRoute.Comments}/${cardId}`, {rating, comment});
    dispatch(loadOfferComments(data));
  }
);
