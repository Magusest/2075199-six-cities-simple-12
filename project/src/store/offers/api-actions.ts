import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from 'const';
import { Offers, Offer } from 'types/offers.js';
import { ReviewData, Reviews } from 'types/reviews';

export const fetchOffers = createAsyncThunk<
  Offers,
  undefined,
  {
  extra: AxiosInstance;
  }
>(
  'data/fetchOffers',
  async (_arg, { extra: api}) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    return data;
  }
);

export const fetchChosenOffer = createAsyncThunk<
  [Offer, Offers, Reviews],
  Offer['id'],
  {
  extra: AxiosInstance;
  }
>(
  'data/fetchChosenOffer',
  async (cardId, { extra: api}) => {
    const [offer, nearbyOffers, comments] = await Promise.all([
      api.get<Offer>(`${APIRoute.Offers}/${cardId}`),
      api.get<Offers>(`${APIRoute.Offers}/${cardId}/nearby`),
      api.get<Reviews>(`${APIRoute.Comments}/${cardId}`)
    ]);

    return [offer.data, nearbyOffers.data, comments.data];
  }
);

export const sendReviewAction = createAsyncThunk<
  Reviews,
  {
    rating: ReviewData['rating'];
    review: ReviewData['review'];
    offerId: Offer['id'];
  },
  {
    extra: AxiosInstance;
  }
>(
  'data/sendReviewAction',
  async (
    {rating, review: comment, offerId: cardId},{ extra: api}
  ) => {
    const { data } = await api.post<Reviews>(`${APIRoute.Comments}/${cardId}`, {rating, comment});
    return data;
  }
);
