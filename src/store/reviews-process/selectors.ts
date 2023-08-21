import { createSelector } from '@reduxjs/toolkit';
import { ActionGroup, ReviewsConfig } from '../../const';
import { State } from '../../types/state';

export const getReviews = (state: Pick<State, ActionGroup.Reviews>) => state[ActionGroup.Reviews].reviews;

export const getReviewsLimit = createSelector(getReviews, (reviews) => reviews.slice(0, ReviewsConfig.CountOnFavoritePage));

export const getSendCommentStatus = (state: Pick<State, ActionGroup.Reviews>) => state[ActionGroup.Reviews].fetch.sendComment;
