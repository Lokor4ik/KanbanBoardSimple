import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { SnackbarMessage, OptionsObject, SnackbarKey } from 'notistack';

import { AuthInitialState } from './auth/types';
import { ProjectInitialState } from './projects/types';
import { KanbanInitialState } from './kanban/types';

export const CLEAR_ALL_REDUCERS_DATA = 'CLEAR_ALL_REDUCERS_DATA';

export interface RootState {
  kanban: KanbanInitialState;
  auth: AuthInitialState;
  projects: ProjectInitialState;
}

export type RootThunkAction = ThunkAction<void, RootState, null, AnyAction>;

export interface ProviderContextNotistack {
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
}
