import { ActionGroup } from '../../const';
import { State } from '../../types/state';

export const getReviews = (state: Pick<State, ActionGroup.Reviews>) => state[ActionGroup.Reviews].reviews;

export const getSendCommentStatus = (state: Pick<State, ActionGroup.Reviews>) => state[ActionGroup.Reviews].fetch.sendComment;
