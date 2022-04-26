import { createContext, useContext, useReducer } from 'react';
import { AuthAction } from './authActions';
import { authReducer, AuthState, initialState } from './authReducer';

interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextProps>({
  state: initialState,
  dispatch: () => initialState
});

export const AuthProvider = (props: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }} {...props}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
