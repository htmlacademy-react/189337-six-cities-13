import { globalProcess, setIsLoading } from './global-process';

describe('GlobalProcess Slice', () => {
  it('should change isLoading', () => {
    const isLoading = true;
    const expectedState = { isLoading: false };

    const result = globalProcess.reducer(expectedState, setIsLoading(isLoading));

    expect(result.isLoading).toBe(isLoading);
  });
});
