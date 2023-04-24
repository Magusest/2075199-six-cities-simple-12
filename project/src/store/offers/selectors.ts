import { NameSpace } from 'const';
import { State } from 'types/state';

export const getLoadingStatus = (state: State) => state[NameSpace.Data].offers.isLoading;

export const getCurrentOffer = (state: State) => state[NameSpace.Data].offers.currentOffers;
export const getCurrentCity = (state: State) => state[NameSpace.Data].city;
export const getHoverCard = (state: State) => state[NameSpace.Data].hoveredCard;
export const getSorting = (state: State) => state[NameSpace.Data].sorting;

export const getChosenOffer = (state: State) => state[NameSpace.Data].chosenOffer.offer;
export const getNearbyOffers = (state: State) => state[NameSpace.Data].chosenOffer.nearbyOffers;
export const getOfferComments = (state: State) => state[NameSpace.Data].chosenOffer.comments;
export const getErrorStatus = (state: State) => state[NameSpace.Data].chosenOffer.isError;
export const getLoadingOfferStatus = (state: State) => state[NameSpace.Data].chosenOffer.isLoading;

export const getSendingLoading = (state: State) => state[NameSpace.Data].review.isSending;
export const getSendingError = (state: State) => state[NameSpace.Data].review.isSendError;
