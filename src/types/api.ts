import { Review } from './review';

export type AuthData = {
  login: string;
  password: string;
}

export type ReviewData = Pick<Review, 'id' | 'comment' | 'rating'>;

export type DetailMessageType = {
  type: string;
  message: string;
}

export type Token = string;
