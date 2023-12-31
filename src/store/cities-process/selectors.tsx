import { createSelector } from '@reduxjs/toolkit';
import { ActionGroup } from '../../const';
import { State } from '../../types/state';
import { sortOffers } from '../../cities';

export const getActiveCity = (state: Pick<State, ActionGroup.Cities>) => state[ActionGroup.Cities].activeCity;

export const getOffers = (state: Pick<State, ActionGroup.Cities>) => state[ActionGroup.Cities].offers;

export const getOfferSelected = (state: Pick<State, ActionGroup.Cities>) => state[ActionGroup.Cities].offerSelected;

export const getCityInfo = (state: Pick<State, ActionGroup.Cities>) => state[ActionGroup.Cities].cityInfo;

export const getActiveSort = (state: Pick<State, ActionGroup.Cities>) => state[ActionGroup.Cities].sortingMenu.activeSort;

export const getSortingMenuVisible = (state: Pick<State, ActionGroup.Cities>) => state[ActionGroup.Cities].sortingMenu.visible;

export const getOffersSorted = createSelector([getOffers, getActiveSort], (offers, activeSort) => sortOffers(offers,activeSort));
