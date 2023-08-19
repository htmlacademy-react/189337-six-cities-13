import { ActionGroup } from '../../const';
import { State } from '../../types/state';

export const getIsAuth = (state: State) => state[ActionGroup.User].isAuth;

export const getUserInfo = (state: State) => state[ActionGroup.User].userInfo;
