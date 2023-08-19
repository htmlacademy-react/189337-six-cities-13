import { ActionGroup } from '../../const';
import { State } from '../../types/state';

export const getIsLoading = (state: Pick<State, ActionGroup.Global>) => state[ActionGroup.Global].isLoading;
