import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from 'const';
import { UserData } from 'types/user-data';


export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthrithationStatus');
export const setUserData = createAction<UserData>('user/setuserData');
