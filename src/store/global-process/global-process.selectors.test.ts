import { ActionGroup } from '../../const';
import { GlobalProcess } from '../../types/global';
import { getIsLoading } from './selectors';

describe('GlobalProcess selectors', () => {
  it('should return isLoading from state', () => {
    const isLoading = false;
    const state: GlobalProcess = { isLoading };

    const result = getIsLoading({ [ActionGroup.Global]: state });

    expect(result).toBe(isLoading);
  });
});
