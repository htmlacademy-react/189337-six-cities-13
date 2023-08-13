import { RequestStatus } from '../const';
import { Host } from './offers';

export type Review = {
  id: string;
  date: string;
  user: Host;
  comment: string;
  rating: number;
}

export type ReviewsFetchStatus = {
  reviews: RequestStatus;
  sendComment: RequestStatus;
}

export type ReviewsProcess = {
  reviews: Review [];
  fetch: ReviewsFetchStatus;
}
