import { State } from 'types/state';

export const getOffersLoading = (state: State) => state.offers.Offers.isLoading;
export const getCurrentOffer = (state: State) => state.offers.Offers.currentOffers;
export const getCurrentCity = (state: State) => state.offers.city;
export const getHoverCard = (state: State) => state.offers.hoveredCard;
export const getSorting = (state: State) => state.offers.sorting;
export const getChosenOffer = (state: State) => state.offers.chosenOffer;
