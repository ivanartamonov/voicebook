import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useReducer,
  useCallback,
} from 'react';
import {User} from '../types/types.ts';

type LoginData = {
  email: string;
  password: string;
};
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => void;
  logout: () => void;
  register: () => void;
};
type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
};
type Action =
  | {type: 'LOGIN'; payload: User}
  | {type: 'POPULATE'; payload: User}
  | {type: 'LOGOUT'};
type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const reducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'POPULATE':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      throw new Error('Unknown action type');
  }
};

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const login = useCallback((data: LoginData) => {
    // In a production app, we need to send some data (usually username, password) to server and get a token
    // We will also need to handle errors if sign in failed
    // After getting token, we need to persist the token using `SecureStore`
    // In the example, we'll use a dummy token

    if (data.email === 'Test' && data.password === '111') {
      dispatch({type: 'LOGIN', payload: {id: 1, name: 'Ivan Artamonov'}});
    } else {
      throw new Error('Invalid credentials');
    }
  }, []);

  const logout = useCallback(() => {
    dispatch({type: 'LOGOUT'});
  }, []);

  const register = useCallback(() => {
    // In a production app, we need to send user data to server and get a token
    // We will also need to handle errors if sign up failed
    // After getting token, we need to persist the token using `SecureStore`
    // In the example, we'll use a dummy token

    dispatch({type: 'LOGIN', payload: {id: 1, name: 'John Doe'}});
  }, []);

  const authContext = useMemo(
    () => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      login: login,
      logout: logout,
      register: register,
    }),
    [state, login, logout, register],
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
