import { createAction } from '@reduxjs/toolkit';
import { Cities } from '../types/city';
import { Offer, OfferDetails } from '../types/offers';
import { SortingType } from '../types/state';
import { ActionGroup } from '../const';
import { User } from '../types/user';

export const changeActiveCity = createAction<Cities>(`${ActionGroup.Main}/changeActiveCity`);

export const selectOffer = createAction<Offer | null>(`${ActionGroup.Main}/selectOffer`);

export const toggleSortingMenu = createAction<boolean>(`${ActionGroup.Main}/toggleSortingMenu`);

export const changeActiveSort = createAction<SortingType>(`${ActionGroup.Main}/changeActiveSort`);

export const loadOffers = createAction<Offer[]>(`${ActionGroup.Offers}/loadOffers`);

export const loadFavorites = createAction<Offer[]>(`${ActionGroup.Offers}/loadFavorites`);

export const addToFavorite = createAction<OfferDetails>(`${ActionGroup.Offers}/addToFavorite`);

export const requireAuthorization = createAction<User | null>(`${ActionGroup.User}/requireAuthorization`);

export const setError = createAction<string | null>(`${ActionGroup.Data}/setError`);

export const setLoading = createAction<boolean>(`${ActionGroup.Data}/setLoading`);
