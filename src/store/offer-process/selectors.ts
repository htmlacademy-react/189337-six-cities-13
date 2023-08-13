import { ActionGroup } from '../../const';
import { State } from '../../types/state';

export const getOffer = (state: State) => state[ActionGroup.Offer].offer;

export const getOffersNearby = (state: State) => state[ActionGroup.Offer].offersNearby;

export const getOfferId = (state: State) => state[ActionGroup.Offer].offer?.id;
