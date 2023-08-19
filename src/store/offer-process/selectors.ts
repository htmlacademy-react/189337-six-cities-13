import { ActionGroup } from '../../const';
import { State } from '../../types/state';

export const getOffer = (state: Pick<State, ActionGroup.Offer>) => state[ActionGroup.Offer].offer;

export const getOffersNearby = (state: Pick<State, ActionGroup.Offer>) => state[ActionGroup.Offer].offersNearby;

export const getOfferId = (state: Pick<State, ActionGroup.Offer>) => state[ActionGroup.Offer].offer?.id;
