import { RequestStatus } from '../const';
import { Token } from './api';

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: Token;
}

export type UserFetchStatus = {
  check: RequestStatus;
  login: RequestStatus;
  logout: RequestStatus;
}

export type UserProcess = {
  isAuth: boolean;
  userInfo: User | null;
  fetch: UserFetchStatus;
}

