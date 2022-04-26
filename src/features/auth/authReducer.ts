import { AuthAction, GET_CURRENT_USER, IS_AUTHEN, LOGIN, LOGOUT, REGISTER } from './authActions';
import { User } from './authModels';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null
};

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true
      };
    case REGISTER:
      return state;
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case IS_AUTHEN:
      return {
        ...state,
        isAuthenticated: action.payload
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
