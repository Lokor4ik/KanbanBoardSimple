import request from 'services/axios';
import handleErrors from 'utils/actionErrors';
import getFetchHeaders from 'utils/getFetchHeaders';

import { RootThunkAction, ProviderContextNotistack } from 'store/types';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  MAIN_LOADED_SUCCESS,
  USER_LOADING_REQUEST,
  USER_LOADED_SUCCESS,
  AUTH_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ParamsRegisterUser,
  ParamsLoginUser,
} from './types';

export const loadUser = ({ enqueueSnackbar }: ProviderContextNotistack): RootThunkAction => async (
  dispatch
) => {
  if (localStorage.token) {
    try {
      dispatch({ type: USER_LOADING_REQUEST });

      const headers = getFetchHeaders();
      const user = await request('/api/auth', 'GET', null, headers);

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: { user, token: localStorage.getItem('token') },
      });
    } catch (error) {
      localStorage.removeItem('token');

      const errors = handleErrors(error);

      errors.map(({ msg, severity }) =>
        enqueueSnackbar(msg, {
          variant: severity,
        })
      );

      dispatch({
        type: AUTH_ERROR,
      });
    }
  } else {
    dispatch({
      type: MAIN_LOADED_SUCCESS,
    });
  }
};

export const registerUser = ({
  enqueueSnackbar,
  name,
  email,
  password,
}: ParamsRegisterUser & ProviderContextNotistack): RootThunkAction => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const headers = getFetchHeaders();
    const body = JSON.stringify({ name, email, password });
    const { token, user } = await request('/api/user', 'POST', body, headers);

    localStorage.setItem('token', token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: { token, user },
    });
  } catch (error) {
    localStorage.removeItem('token');

    const errors = handleErrors(error);

    errors.map(({ msg, severity }) =>
      enqueueSnackbar(msg, {
        variant: severity,
      })
    );

    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};

export const loginUser = ({
  enqueueSnackbar,
  email,
  password,
}: ParamsLoginUser & ProviderContextNotistack): RootThunkAction => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const headers = getFetchHeaders();
    const body = JSON.stringify({ email, password });
    const { token, user } = await request('/api/auth', 'POST', body, headers);

    localStorage.setItem('token', token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, user },
    });
  } catch (error) {
    localStorage.removeItem('token');

    const errors = handleErrors(error);

    errors.map(({ msg, severity }) =>
      enqueueSnackbar(msg, {
        variant: severity,
      })
    );

    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};
