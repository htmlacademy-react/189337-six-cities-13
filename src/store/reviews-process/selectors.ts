import { ActionGroup } from '../../const';
import { State } from '../../types/state';

export const getReviews = (state: State) => state[ActionGroup.Reviews].reviews;

export const getSendCommentStatus = (state: State) => state[ActionGroup.Reviews].fetch.sendComment;
