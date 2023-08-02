import { Host } from './offers';

export type Review = {
  id: string;
  date: string;
  user: Host;
  comment: string;
  rating: number;
}

export type GroupReviewById = {
  [key: string]: Review [];
}
