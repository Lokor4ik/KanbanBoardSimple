import { combineReducers, AnyAction } from 'redux';

import { CLEAR_ALL_REDUCERS_DATA, RootState } from 'store/types';

import kanban from './kanban';
import projects from './projects';

import { initialStateProjects } from './projects/reducer';
import { initialStateKanban } from './kanban/reducer';

export const RootInitialState = {
  kanban: initialStateKanban,
  projects: initialStateProjects,
};

const allReducers = combineReducers({
  kanban: kanban.reducer,
  projects: projects.reducer,
});

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  switch (action.type) {
    case CLEAR_ALL_REDUCERS_DATA:
      return {
        ...RootInitialState,
      };

    default:
      return allReducers(state, action);
  }
};

export default rootReducer;
