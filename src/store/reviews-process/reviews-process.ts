import { createSlice } from '@reduxjs/toolkit';
import { ActionGroup, RequestStatus } from '../../const';
import { fetchReviews, sendComment } from '../api-action';
import { sortReviews } from '../../cities';
import { ReviewsProcess } from '../../types/review';

const initialState: ReviewsProcess = {
  reviews: [],
  fetch: {
    reviews: RequestStatus.Idle,
    sendComment: RequestStatus.Idle
  }
};

export const reviewsProcess = createSlice({
  name: ActionGroup.Reviews,
  initialState,
  reducers: {
    resetSendCommentStatus: (state) => {
      state.fetch.sendComment = RequestStatus.Idle;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.fulfilled, (state, { payload }) => {
        state.fetch.reviews = RequestStatus.Success;
        state.reviews = sortReviews(payload);
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.fetch.reviews = RequestStatus.Error;
      })
      .addCase(sendComment.rejected, (state) => {
        state.fetch.sendComment = RequestStatus.Error;
      })
      .addCase(sendComment.pending, (state) => {
        state.fetch.sendComment = RequestStatus.Pending;
      })
      .addCase(sendComment.fulfilled, (state, { payload }) => {
        state.fetch.sendComment = RequestStatus.Success;
        state.reviews.unshift(payload);
      });
  }
});

export const { resetSendCommentStatus } = reviewsProcess.actions;
