import { State } from 'types/state';

export const getOffersLoading = (state: State) => state.offers.offers.isLoading;
export const getCurrentOffer = (state: State) => state.offers.offers.currentOffers;
export const getCurrentCity = (state: State) => state.offers.city;
export const getHoverCard = (state: State) => state.offers.hoveredCard;
export const getSorting = (state: State) => state.offers.sorting;

export const getChosenOffer = (state: State) => state.offers.chosenOffer.offer;
export const getNearbyOffers = (state: State) => state.offers.chosenOffer.nearbyOffers;
export const getOfferComments = (state: State) => state.offers.chosenOffer.comments;


