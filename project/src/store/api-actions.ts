import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { Offers } from 'types/offers.js';
import { loadOffers, setRoomsLoadingStatus } from './actions';
import {APIRoute} from '../const';

export const fetchOffer = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setRoomsLoadingStatus(true));
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(setRoomsLoadingStatus(false));
    dispatch(loadOffers(data));

  }
);
