import { AnyAction } from 'redux';

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADED_SUCCESS,
  MAIN_LOADED_SUCCESS,
  AUTH_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  AuthInitialState,
} from './types';

export const initialStateAuth: AuthInitialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  user: null,
};

export default function reducer(state = initialStateAuth, action: AnyAction) {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case USER_LOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MAIN_LOADED_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
      };
    case AUTH_ERROR:
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...initialStateAuth,
      };
    default:
      return state;
  }
}
