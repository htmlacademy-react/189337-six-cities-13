import { ActionGroup, CITIES, SortingTypes } from '../../const';
import { CitiesProcess } from '../../types/city';
import { makeEmptyCitiesState, makeFakeCity, makeFakeOffer, makeFakeOffers } from '../../utils/mock';
import { getActiveCity, getOffers, getActiveSort, getCityInfo, getOfferSelected, getSortingMenuVisible } from './selectors';

describe('CitiesProcess selectors', () => {
  it('should return activeCity from state', () => {
    const activeCity = CITIES[0];
    const state: CitiesProcess = { ...makeEmptyCitiesState(), activeCity };

    const result = getActiveCity({ [ActionGroup.Cities]: state });

    expect(result).toBe(activeCity);
  });

  it('should return offers from state', () => {
    const offers = makeFakeOffers();
    const state: CitiesProcess = { ...makeEmptyCitiesState(), offers };

    const result = getOffers({ [ActionGroup.Cities]: state });

    expect(result).toEqual(offers);
  });

  it('should return activeSort from state', () => {
    const activeSort = SortingTypes.Popular;
    const state: CitiesProcess = {
      ...makeEmptyCitiesState(), sortingMenu: { visible: false, activeSort }
    };

    const result = getActiveSort({ [ActionGroup.Cities]: state });

    expect(result).toBe(activeSort);
  });

  it('should return cityInfo from state', () => {
    const cityInfo = makeFakeCity();
    const state: CitiesProcess = { ...makeEmptyCitiesState(), cityInfo };

    const result = getCityInfo({ [ActionGroup.Cities]: state });

    expect(result).toEqual(cityInfo);
  });

  it('should return offerSelected from state', () => {
    const offerSelected = makeFakeOffer();
    const state: CitiesProcess = { ...makeEmptyCitiesState(), offerSelected };

    const result = getOfferSelected({ [ActionGroup.Cities]: state });

    expect(result).toEqual(offerSelected);
  });

  it('should return sortingMenuVisible from state', () => {
    const visible = true;
    const state: CitiesProcess = { ...makeEmptyCitiesState(), sortingMenu: { visible, activeSort: SortingTypes.Popular } };

    const result = getSortingMenuVisible({ [ActionGroup.Cities]: state });

    expect(result).toBe(visible);
  });
});
