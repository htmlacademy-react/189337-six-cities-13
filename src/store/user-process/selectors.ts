import { ActionGroup } from '../../const';
import { State } from '../../types/state';

export const getIsAuth = (state: Pick<State, ActionGroup.User>) => state[ActionGroup.User].isAuth;

export const getUserInfo = (state: Pick<State, ActionGroup.User>) => state[ActionGroup.User].userInfo;

export const getCheckAuthStatus = (state: Pick<State, ActionGroup.User>) => state[ActionGroup.User].fetch.check;
