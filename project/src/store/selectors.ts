import { State } from 'types/state';

export const getOffersLoading = (state: State) => state.isOffersLoading;
export const getCurrentOffer = (state: State) => state.currentOffers;
export const getCurrentCity = (state: State) => state.city;
export const getHoverCard = (state: State) => state.hoveredCard;
export const getSorting = (state: State) => state.sorting;

export const getUserData = (state: State) => state.userData;
export const getAuthorithationStatus = (state: State) => state.authorizationStatus;

