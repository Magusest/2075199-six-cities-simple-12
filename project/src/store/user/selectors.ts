import { State } from 'types/state';

export const getUserData = (state: State) => state.user.userData;
export const getAuthorithationStatus = (state: State) => state.user.authorizationStatus;

