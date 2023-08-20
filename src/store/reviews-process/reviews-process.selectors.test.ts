import { ActionGroup, RequestStatus } from '../../const';
import { ReviewsProcess, ReviewsFetchStatus } from '../../types/review';
import { makeFakeFetchStatus, makeFakeReviews } from '../../utils/mock';
import { getReviews, getSendCommentStatus } from './selectors';

describe('ReviewsProcess selectors', () => {
  it('should return reviews from state', () => {
    const reviews = makeFakeReviews();
    const state: ReviewsProcess = { reviews, fetch: makeFakeFetchStatus<ReviewsFetchStatus>(['reviews', 'sendComment']) };

    const result = getReviews({ [ActionGroup.Reviews]: state });

    expect(result).toEqual(reviews);
  });

  it('should return sendCommentStatus from state', () => {
    const sendCommentStatus = RequestStatus.Idle;
    const state: ReviewsProcess = { reviews: [], fetch: makeFakeFetchStatus<ReviewsFetchStatus>(['reviews', 'sendComment']) };

    const result = getSendCommentStatus({ [ActionGroup.Reviews]: state });

    expect(result).toBe(sendCommentStatus);
  });
});
