import { createAction } from '@reduxjs/toolkit';

export const rendrDefaultCity = createAction('rendrDefaultCity');
export const changeCity = createAction<string>('changeCity');
