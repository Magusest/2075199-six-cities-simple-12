import { User } from './user';

type AuthData = {
  email: string;
  token: string;
};

export type UserData = User & AuthData;
