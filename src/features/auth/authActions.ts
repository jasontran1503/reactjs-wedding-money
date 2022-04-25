import { LoginRequest } from './authModel';

export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';
export const IS_AUTHEN = '[Auth] IS_AUTHEN';
export const GET_CURRENT_USER = '[Auth] GET_CURRENT_USER';

const authActionTypes = [LOGIN, LOGOUT, IS_AUTHEN, GET_CURRENT_USER] as const;

export type AuthActionType = typeof authActionTypes[number];

export interface AuthAction {
  type: AuthActionType;
  payload: any;
}

const login = (payload: LoginRequest): AuthAction => ({
  type: LOGIN,
  payload
});

export const authActions = {
  login
};
