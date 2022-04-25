import { AuthAction, LOGIN } from './authActions';

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  isLoading: boolean;
  error: any | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null
};

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case LOGIN:
      console.log(state);
      console.log(action);
      return state;

    default:
      return state;
  }
};
