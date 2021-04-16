export const PROJECTS_LOADING_REQUEST = 'PROJECTS_LOADING_REQUEST';
export const PROJECTS_LOADING_SUCCESS = 'PROJECTS_LOADING_SUCCESS';
export const CREATE_NEW_PROJECT_REQUEST = 'CREATE_NEW_PROJECT_REQUEST';
export const CREATE_NEW_PROJECT_SUCCESS = 'CREATE_NEW_PROJECT_SUCCESS';
export const UPDATE_PROJECT_REQUEST = 'UPDATE_PROJECT_REQUEST';
export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS';
export const GET_ONE_PROJECT_REQUEST = 'GET_ONE_PROJECT_REQUEST';
export const GET_ONE_PROJECT_SUCCESS = 'GET_ONE_PROJECT_SUCCESS';
export const PROJECTS_FAILURE = 'PROJECTS_FAILURE';
export const PROJECTS_ONE_PROJECT_FAILURE = 'PROJECTS_ONE_PROJECT_FAILURE';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export type ProjectsRows = Array<{ _id: string; name: string; key: string; createdAt: Date }>;

export interface ProjectInitialState {
  rows: ProjectsRows | null;
  loading: boolean;
  creatingProject: boolean;
  currentProject: {
    _id: string;
    name: string;
    key: string;
  };
  error: boolean;
}

export type ParamsCreateProject = {
  name: string;
  key: string;
};

export type ParamsUpdateProject = {
  name: string;
  key: string;
  id: string;
};

export type ParamsCUProject = {
  dispatchTypeRequest: string;
  dispatchTypeSucces: string;
  body: string | null;
  method: string;
};

export type ParamsGetOneProject = {
  id: string;
};
