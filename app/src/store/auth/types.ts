export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const USER_LOADING_REQUEST = 'USER_LOADING_REQUEST';
export const USER_LOADED_SUCCESS = 'USER_LOADED_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const MAIN_LOADED_SUCCESS = 'MAIN_LOADED_SUCCESS';

export interface AuthInitialState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
    date: Date;
  } | null;
}

export type ParamsRegisterUser = ParamsLoginUser & {
  name: string;
};

export type ParamsLoginUser = {
  email: string;
  password: string;
};
