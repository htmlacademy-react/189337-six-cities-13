import { globalProcess, setIsLoading, setLoaderIsActive } from './global-process';

describe('GlobalProcess Slice', () => {

  it('should change isLoading', () => {
    const isLoading = true;
    const expectedState = { isLoading: false, loaderIsActive: true };

    const result = globalProcess.reducer(expectedState, setIsLoading(isLoading));

    expect(result.isLoading).toBe(isLoading);
  });

  it('should change loaderIsActive', () => {
    const loaderIsActive = true;
    const expectedState = { isLoading: false, loaderIsActive: false };

    const result = globalProcess.reducer(expectedState, setLoaderIsActive(loaderIsActive));

    expect(result.loaderIsActive).toBe(loaderIsActive);
  });
});
