import { RequestStatus } from '../../const';
import { resetSendCommentStatus, reviewsProcess } from './reviews-process';

describe('ReviewsProcess Slice', () => {
  it('should reset sendCommentStatus', () => {
    const sendCommentStatus = RequestStatus.Idle;
    const expectedState = {
      reviews: [],
      fetch: {
        reviews: RequestStatus.Idle,
        sendComment: RequestStatus.Success
      }
    };

    const result = reviewsProcess.reducer(expectedState, resetSendCommentStatus());

    expect(result.fetch.sendComment).toBe(sendCommentStatus);
  });
});
