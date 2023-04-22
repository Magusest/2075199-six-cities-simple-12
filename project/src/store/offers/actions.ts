import { createAction } from '@reduxjs/toolkit';
import { Offer, Offers } from 'types/offers';
import { Review, Reviews } from 'types/reviews';


export const updateOffers = createAction('offers/updateOffers');
export const changeCity = createAction<string>('offers/changeCity');
export const hovereCard = createAction<number>('offers/hoverCard');
export const sortOffers = createAction<{checkedSorting: string}>('offers/sortingOffers');
export const loadOffers = createAction<Offers>('offers/loadOffers');
export const initialLoading = createAction('offers/initialLoading');

export const loadChosenOffer = createAction<Offer>('offer/loadChosenOffer');
export const loadNearbyOffer = createAction<Offers>('offer/loadNearbyOffer');
export const loadOfferComments = createAction<Reviews>('offer/loadOfferComment');

export const sendNewComment = createAction<Review>('offer/loadOfferComment');
