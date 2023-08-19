import { ActionGroup } from '../../const';
import { FavoritesProcess, FavoritesFetchStatus } from '../../types/offers';
import { makeFakeFetchStatus, makeFakeOffers } from '../../utils/mock';
import { getFavorites } from './selectors';

describe('FavoritesProcess selectors', () => {
  it('should return favorites from state', () => {
    const favorites = makeFakeOffers();
    const state: FavoritesProcess = { favorites, fetch: makeFakeFetchStatus<FavoritesFetchStatus>(['favorites']) };

    const result = getFavorites({ [ActionGroup.Favorites]: state });

    expect(result).toEqual(favorites);
  });
});
