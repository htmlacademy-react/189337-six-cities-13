import { User } from './offers';

export type Review = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

export type GroupReviewById = {
  [key: string]: Review [];
}
