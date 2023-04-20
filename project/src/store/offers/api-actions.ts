import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from 'const';
import {AppDispatch, State} from 'types/state';
import { Offers, Offer } from 'types/offers.js';
import { loadChosenOffer, loadOffers, setRoomsLoadingStatus } from './actions';

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
    dispatch(setRoomsLoadingStatus(true));
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(setRoomsLoadingStatus(false));
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
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${cardId}`);
    dispatch(loadChosenOffer(data));
  }
);

// export const fetchTargetOfferAction = createAsyncThunk<
//   [OfferItem, OfferList, ReviewList],
//   OfferItem['id'],
//   { extra: AxiosInstance }
// >('data/fetchTargetOffer', async (hotelId, { extra: api }) => {
//   const [offer, nearbyOffers, comments] = await Promise.all([
//     api.get<OfferItem>(`${APIRoute.Offers}/${hotelId}`),
//     api.get<OfferList>(`${APIRoute.Offers}/${hotelId}/nearby`),
//     api.get<ReviewList>(`${APIRoute.Comments}/${hotelId}`),
//   ]);

//   return [offer.data, nearbyOffers.data, comments.data];
// });
