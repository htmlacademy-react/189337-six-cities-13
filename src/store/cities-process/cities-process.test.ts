import { CITIES, SortingTypes } from '../../const';
import { makeEmptyCitiesState, makeFakeOffer } from '../../utils/mock';
import { citiesProcess, changeActiveCity, toggleSortingMenu, changeActiveSort, setOfferSelected } from './cities-process';

describe('CitiesProcess Slice', () => {
  it('should change activeCity', () => {
    const activeCity = CITIES[1];
    const expectedState = { ...makeEmptyCitiesState(), activeCity: CITIES[0] };

    const result = citiesProcess.reducer(expectedState, changeActiveCity(activeCity));

    expect(result.activeCity).toBe(activeCity);
  });

  it('should toggle sortingMenu', () => {
    const visible = true;
    const expectedState = { ...makeEmptyCitiesState(), sortingMenu: { visible: false, activeSort: SortingTypes.Popular } };

    const result = citiesProcess.reducer(expectedState, toggleSortingMenu(visible));

    expect(result.sortingMenu.visible).toBe(visible);
  });

  it('should change activeSort', () => {
    const activeSort = SortingTypes.TopRatedFirst;
    const expectedState = { ...makeEmptyCitiesState(), sortingMenu: { visible: false, activeSort: SortingTypes.Popular } };

    const result = citiesProcess.reducer(expectedState, changeActiveSort(activeSort));

    expect(result.sortingMenu.activeSort).toBe(activeSort);
  });

  it('should set offerSelected', () => {
    const offerSelected = makeFakeOffer();
    const expectedState = { ...makeEmptyCitiesState(), offerSelected: null };

    const result = citiesProcess.reducer(expectedState, setOfferSelected(offerSelected));

    expect(result.offerSelected).toBe(offerSelected);
  });

});
