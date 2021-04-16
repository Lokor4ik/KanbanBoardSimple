import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { SnackbarMessage, OptionsObject, SnackbarKey } from 'notistack';

import { ProjectInitialState } from './projects/types';
import { KanbanInitialState } from './kanban/types';

export const CLEAR_ALL_REDUCERS_DATA = 'CLEAR_ALL_REDUCERS_DATA';

export interface RootState {
  kanban: KanbanInitialState;
  projects: ProjectInitialState;
}

export type RootThunkDispatch = ThunkDispatch<RootState, null, AnyAction>;

export type RootThunkAction = ThunkAction<void, RootState, null, AnyAction>;

export interface ProviderContextNotistack {
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
}
