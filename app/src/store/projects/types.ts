export const PROJECTS_LOADING_REQUEST = 'PROJECTS_LOADING_REQUEST';
export const PROJECTS_LOADING_SUCCESS = 'PROJECTS_LOADING_SUCCESS';
export const CREATE_NEW_PROJECT_REQUEST = 'CREATE_NEW_PROJECT_REQUEST';
export const CREATE_NEW_PROJECT_SUCCESS = 'CREATE_NEW_PROJECT_SUCCESS';
export const GET_ONE_PROJECT_REQUEST = 'GET_ONE_PROJECT_REQUEST';
export const GET_ONE_PROJECT_SUCCESS = 'GET_ONE_PROJECT_SUCCESS';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const PROJECTS_FAILURE = 'PROJECTS_FAILURE';
export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const PROJECTS_ONE_PROJECT_FAILURE = 'PROJECTS_ONE_PROJECT_FAILURE';
export const PROJECTS_FIND_USER_FAILURE = 'PROJECTS_FIND_USER_FAILURE';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export type ProjectsRows = Array<{ _id: string; name: string; key: string; lead: string }>;
export type ProjectParticipants = Array<{ _id: string; name: string; email: string }>;

export interface ProjectInitialState {
  rows: ProjectsRows | null;
  loading: boolean;
  creatingProject: boolean;
  currentProject: {
    _id: string;
    name: string;
    key: string;
    lead: string;
    participants: ProjectParticipants;
  };
  error: boolean;
}

export type ParamsNewProject = {
  name: string;
  key: string;
  lead: string;
};

export type ParamsGetOneProject = {
  id: string;
};

export type ParamsGetUserByEmail = {
  user: string;
  projectId: string;
};

export type ParamsDeleteUser = {
  userId: string;
  projectId: string;
};
