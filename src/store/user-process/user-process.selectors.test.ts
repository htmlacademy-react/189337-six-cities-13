import { ActionGroup } from '../../const';
import { UserProcess, UserFetchStatus, User } from '../../types/user';
import { makeFakeFetchStatus, makeFakeUser } from '../../utils/mock';
import { getIsAuth, getUserInfo } from './selectors';

describe('UserProcess selectors', () => {
  it('should return isAuth from state', () => {
    const isAuth = false;
    const state: UserProcess = { isAuth, userInfo: null, fetch: makeFakeFetchStatus<UserFetchStatus>(['check', 'login', 'logout']) };

    const result = getIsAuth({ [ActionGroup.User]: state });

    expect(result).toBe(isAuth);
  });

  it('should return userInfo from state', () => {
    const userInfo: User = makeFakeUser();
    const state: UserProcess = { isAuth: true, userInfo, fetch: makeFakeFetchStatus<UserFetchStatus>(['check', 'login', 'logout']) };

    const result = getUserInfo({ [ActionGroup.User]: state });

    expect(result).toEqual(userInfo);
  });
});
