import request from 'services/axios';
import getFetchHeaders from 'utils/getFetchHeaders';
import handleErrors from 'utils/actionErrors';
import createUpdateProject from 'utils/actionCUProject';

import { RootThunkAction, ProviderContextNotistack } from 'store/types';

import {
  PROJECTS_LOADING_REQUEST,
  PROJECTS_LOADING_SUCCESS,
  CREATE_NEW_PROJECT_REQUEST,
  CREATE_NEW_PROJECT_SUCCESS,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  GET_ONE_PROJECT_REQUEST,
  GET_ONE_PROJECT_SUCCESS,
  DELETE_CURRENT_PROJECT_REQUEST,
  DELETE_CURRENT_PROJECT_SUCCESS,
  CLEAR_ROWS,
  PROJECTS_ONE_PROJECT_FAILURE,
  PROJECTS_FAILURE,
  CLEAR_ERRORS,
  ParamsCreateProject,
  ParamsUpdateProject,
  ParamsGetOneProject,
} from './types';

export const getProjects = ({
  enqueueSnackbar,
}: ProviderContextNotistack): RootThunkAction => async (dispatch) => {
  try {
    dispatch({
      type: PROJECTS_LOADING_REQUEST,
    });

    const headers = getFetchHeaders();
    const rows = await request('/api/project', 'GET', null, headers);

    dispatch({
      type: PROJECTS_LOADING_SUCCESS,
      payload: { rows },
    });
  } catch (error) {
    const errors = handleErrors(error);

    errors.map(({ msg, severity }) =>
      enqueueSnackbar(msg, {
        variant: severity,
      })
    );

    dispatch({
      type: PROJECTS_FAILURE,
    });
  }
};

export const createNewProject = ({
  enqueueSnackbar,
  name,
  key,
}: ParamsCreateProject & ProviderContextNotistack): RootThunkAction => async (dispatch) => {
  const body = JSON.stringify({ name, key });

  createUpdateProject({
    dispatch,
    dispatchTypeRequest: CREATE_NEW_PROJECT_REQUEST,
    dispatchTypeSucces: CREATE_NEW_PROJECT_SUCCESS,
    body,
    method: 'POST',
    enqueueSnackbar,
  });
};

export const updateProject = ({
  enqueueSnackbar,
  name,
  key,
  id,
}: ParamsUpdateProject & ProviderContextNotistack): RootThunkAction => async (dispatch) => {
  const body = JSON.stringify({ name, key, id });

  createUpdateProject({
    dispatch,
    dispatchTypeRequest: UPDATE_PROJECT_REQUEST,
    dispatchTypeSucces: UPDATE_PROJECT_SUCCESS,
    body,
    method: 'PATCH',
    enqueueSnackbar,
  });
};

export const getOneProject = ({
  id,
  enqueueSnackbar,
}: ParamsGetOneProject & ProviderContextNotistack): RootThunkAction => async (dispatch) => {
  try {
    dispatch({
      type: GET_ONE_PROJECT_REQUEST,
    });

    const headers = getFetchHeaders();
    const project = await request(`/api/project/${id}`, 'GET', null, headers);

    dispatch({
      type: GET_ONE_PROJECT_SUCCESS,
      payload: { project },
    });
  } catch (error) {
    const errors = handleErrors(error);

    errors.map(({ msg, severity }) =>
      enqueueSnackbar(msg, {
        variant: severity,
      })
    );

    dispatch({
      type: PROJECTS_ONE_PROJECT_FAILURE,
    });
  }
};

export const deleteCurrentProject = ({
  id,
  enqueueSnackbar,
}: ParamsGetOneProject & ProviderContextNotistack): RootThunkAction => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CURRENT_PROJECT_REQUEST,
    });

    const headers = getFetchHeaders();
    const body = JSON.stringify({ id });

    const { msg, severity } = await request('/api/project', 'DELETE', body, headers);

    enqueueSnackbar(msg, {
      variant: severity,
    });

    dispatch({
      type: DELETE_CURRENT_PROJECT_SUCCESS,
    });
  } catch (error) {
    const errors = handleErrors(error);

    errors.map(({ msg, severity }) =>
      enqueueSnackbar(msg, {
        variant: severity,
      })
    );

    dispatch({
      type: PROJECTS_FAILURE,
    });
  }
};

export const clearProjectRows = (): RootThunkAction => async (dispatch) => {
  dispatch({
    type: CLEAR_ROWS,
  });
};

export const clearProjectErrors = (): RootThunkAction => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
