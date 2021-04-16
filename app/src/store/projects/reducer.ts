import { AnyAction } from 'redux';

import {
  PROJECTS_LOADING_REQUEST,
  PROJECTS_LOADING_SUCCESS,
  CREATE_NEW_PROJECT_REQUEST,
  CREATE_NEW_PROJECT_SUCCESS,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  GET_ONE_PROJECT_REQUEST,
  GET_ONE_PROJECT_SUCCESS,
  PROJECTS_ONE_PROJECT_FAILURE,
  PROJECTS_FAILURE,
  CLEAR_ERRORS,
  ProjectInitialState,
} from './types';

export const initialStateProjects: ProjectInitialState = {
  rows: [],
  loading: false,
  creatingProject: false,
  currentProject: {
    _id: '',
    name: '',
    key: '',
  },
  error: false,
};

export default function reducer(state = initialStateProjects, action: AnyAction) {
  switch (action.type) {
    case PROJECTS_LOADING_REQUEST:
    case GET_ONE_PROJECT_REQUEST:
    case UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_NEW_PROJECT_REQUEST: {
      return {
        ...state,
        loading: true,
        creatingProject: true,
      };
    }
    case PROJECTS_LOADING_SUCCESS: {
      return {
        ...state,
        rows: action.payload.rows,
        currentProject: initialStateProjects.currentProject,
        loading: false,
      };
    }
    case CREATE_NEW_PROJECT_SUCCESS:
    case UPDATE_PROJECT_SUCCESS: {
      return {
        ...state,
        creatingProject: false,
      };
    }
    case GET_ONE_PROJECT_SUCCESS: {
      return {
        ...state,
        rows: [],
        loading: false,
        creatingProject: false,
        currentProject: action.payload.project,
      };
    }
    case PROJECTS_ONE_PROJECT_FAILURE: {
      return {
        ...initialStateProjects,
        error: true,
      };
    }
    case PROJECTS_FAILURE: {
      return {
        ...initialStateProjects,
      };
    }
    case CLEAR_ERRORS: {
      return {
        ...initialStateProjects,
        error: false,
      };
    }
    default:
      return state;
  }
}
