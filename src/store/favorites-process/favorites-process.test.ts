import { RequestStatus } from '../../const';
import { makeFakeOffers } from '../../utils/mock';
import { fetchFavorites } from '../api-action';
import { favoritesProcess } from './favorites-process';

describe('FavoriteProcess Slice', () => {
  it('should set favorites', () => {

    const favorites = makeFakeOffers();
    const favoritesStatus = RequestStatus.Success;
    const expectedState = {
      favorites: [],
      fetch: {
        favorites: RequestStatus.Idle
      }
    };

    const result = favoritesProcess.reducer(expectedState, fetchFavorites.fulfilled(favorites, '', undefined));

    expect(result.favorites).toEqual(favorites);
    expect(result.fetch.favorites).toBe(favoritesStatus);
  });
});
