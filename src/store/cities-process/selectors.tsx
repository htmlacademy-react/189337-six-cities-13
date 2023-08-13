import { createSelector } from '@reduxjs/toolkit';
import { ActionGroup } from '../../const';
import { State } from '../../types/state';
import { sortOffers } from '../../cities';

export const getActiveCity = (state: State) => state[ActionGroup.Cities].activeCity;

export const getOffers = (state: State) => state[ActionGroup.Cities].offers;

export const getOfferSelected = (state: State) => state[ActionGroup.Cities].offerSelected;

export const getCityInfo = (state: State) => state[ActionGroup.Cities].cityInfo;

export const getActiveSort = (state: State) => state[ActionGroup.Cities].sortingMenu.activeSort;

export const getSortingMenuVisible = (state: State) => state[ActionGroup.Cities].sortingMenu.visible;

export const getOffersSorted = createSelector([getOffers, getActiveSort], (offers, activeSort) => sortOffers(offers,activeSort));
