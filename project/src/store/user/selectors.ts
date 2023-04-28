import { NameSpace } from 'const';
import { State } from 'types/state';

export const getUserData = (state: State) => state[NameSpace.User].userData;
export const getAuthorithationStatus = (state: State) => state[NameSpace.User].authorizationStatus;
export const getIsChecking = (state: State) => state[NameSpace.User].isChecking;


