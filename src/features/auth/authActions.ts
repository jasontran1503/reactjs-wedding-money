import { User } from './authModels';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const IS_AUTHEN = 'IS_AUTHEN';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export type AuthAction =
  | { type: typeof LOGIN }
  | { type: typeof REGISTER }
  | { type: typeof LOGOUT }
  | { type: typeof GET_CURRENT_USER; payload: User }
  | { type: typeof UPDATE_PROFILE; payload: User }
  | { type: typeof IS_AUTHEN; payload: boolean };

const login = (): AuthAction => ({
  type: LOGIN
});

const isAuthenticated = (payload: boolean): AuthAction => ({
  type: IS_AUTHEN,
  payload
});

const register = (): AuthAction => ({
  type: REGISTER
});

const logout = (): AuthAction => ({
  type: LOGOUT
});

const getCurrentUser = (payload: User): AuthAction => ({
  type: GET_CURRENT_USER,
  payload
});

const updateProfile = (payload: User): AuthAction => ({
  type: UPDATE_PROFILE,
  payload
});

export const authActions = {
  login,
  isAuthenticated,
  register,
  logout,
  getCurrentUser,
  updateProfile
};
