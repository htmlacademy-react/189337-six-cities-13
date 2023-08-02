import { Token } from './api';

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: Token;
}

export type AuthorizationInfo = {
  isAuth: boolean;
  user: User | null;
}
