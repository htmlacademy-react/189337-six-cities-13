import { ActionGroup } from '../../const';
import { State } from '../../types/state';

export const getIsLoading = (state: State) => state[ActionGroup.Global].isLoading;
