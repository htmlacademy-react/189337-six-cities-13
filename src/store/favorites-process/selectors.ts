import { createSelector } from '@reduxjs/toolkit';
import { ActionGroup } from '../../const';
import { State } from '../../types/state';
import { GroupOfferByCityObject } from '../../types/offers';

export const getFavorites = (state: Pick<State, ActionGroup.Favorites>) => state[ActionGroup.Favorites].favorites;

export const getFavoritesGroupByCity = createSelector(getFavorites, (favorites) =>
  Object.values(favorites.reduce((acc: GroupOfferByCityObject, offer) => {
    if (!acc[offer.city.name]) {
      acc[offer.city.name] = { city: offer.city, offers: [] };
    }
    acc[offer.city.name]?.offers.push(offer);
    return acc;
  }, {}))
);
