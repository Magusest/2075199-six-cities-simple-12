import { createAction } from '@reduxjs/toolkit';
import { SortingOption } from 'types/sorting';
import { Offers } from 'types/offers';
import { AuthorizationStatus } from 'const';
import { UserData } from 'types/user-data';


export const updateOffers = createAction('offers/updateOffers');
export const changeCity = createAction<string>('offers/changeCity');
export const hovereCard = createAction<number>('offers/hoverCard');
export const sortOffers = createAction<{checkedSorting: SortingOption}>('offers/sortingOffers');
export const loadOffers = createAction<Offers>('offers/loadOffers');
export const setRoomsLoadingStatus = createAction<boolean>('offers/setRoomsLoadingStatus');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthrithationStatus');
export const setUserData = createAction<UserData>('user/setuserData');
