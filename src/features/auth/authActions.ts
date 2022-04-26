import { LoginRequest, RegisterRequest, User } from './authModels';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const IS_AUTHEN = 'IS_AUTHEN';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';

export type AuthAction =
  | { type: typeof LOGIN }
  | { type: typeof REGISTER }
  | { type: typeof LOGOUT }
  | { type: typeof GET_CURRENT_USER; payload: any }
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

export const authActions = {
  login,
  isAuthenticated,
  register,
  logout,
  getCurrentUser
};
