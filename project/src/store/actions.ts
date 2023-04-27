import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from 'const';

export const REDIRECT_ACTION = 'offer/redirectToRoute';

export const redirectToRoute = createAction<AppRoute>(REDIRECT_ACTION);
