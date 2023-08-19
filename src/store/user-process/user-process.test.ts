import { RequestStatus } from '../../const';
import { makeFakeUser } from '../../utils/mock';
import { checkAuthAction } from '../api-action';
import { userProcess } from './user-process';

describe('UserProcess Slice', () => {
  it('should set checkAuthAction fulfilled', () => {
    const userInfo = makeFakeUser();
    const isAuth = true;
    const checkAuthStatus = RequestStatus.Success;
    const expectedState = {
      isAuth: false,
      userInfo: null,
      fetch: {
        check: RequestStatus.Idle,
        login: RequestStatus.Idle,
        logout: RequestStatus.Idle
      },
    };

    const result = userProcess.reducer(expectedState, checkAuthAction.fulfilled(userInfo, '', undefined));

    expect(result.isAuth).toBe(isAuth);
    expect(result.userInfo).toEqual(userInfo);
    expect(result.fetch.check).toBe(checkAuthStatus);
  });
});
