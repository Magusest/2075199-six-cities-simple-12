import { createAction } from '@reduxjs/toolkit';
import { SortingOption } from 'types/sorting';

export const changeCity = createAction<string>('changeCity');
export const hovereCard = createAction<number>('hoverCard');
export const sortOffers = createAction<{checkedSorting: SortingOption}>('sortingOffers');
