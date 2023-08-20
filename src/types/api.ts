import { Review } from './review';
import { RequestStatus } from '../const';

export type AuthData = {
  login: string;
  password: string;
}

export type ReviewData = Pick<Review, 'id' | 'comment' | 'rating'>;

export type DetailMessageType = {
  type: string;
  message: string;
}

export type FetchStatusObject<T> = {
  [key in keyof T]?: RequestStatus;
};

export type Token = string;

export type Api = {
  setLoader?: (isAcitve: boolean) => void;
}
