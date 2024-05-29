import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useReducer,
  useCallback,
} from 'react';
import {ApiToken} from '../types/types.ts';
import {LoginData, loginUser, registerUser, RegUserData} from '../api/Auth.ts';
import {ApiError} from '../api/Api.ts';
import {usePlayerStore} from '../store/usePlayerStore.ts';

type AuthContextType = {
  token: ApiToken | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => void;
  logout: () => void;
  register: (data: RegUserData) => void;
};
type AuthState = {
  isAuthenticated: boolean;
  token: ApiToken | null;
  isLoading: boolean;
};
type Action =
  | {type: 'LOGIN'; payload: ApiToken}
  | {type: 'POPULATE'; payload: ApiToken}
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
        token: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    default:
      throw new Error('Unknown action type');
  }
};

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const {closeWindow} = usePlayerStore();

  const login = useCallback(async (data: LoginData) => {
    // We need to save the Token in some Secure storage
    try {
      const token = await loginUser(data);
      dispatch({type: 'LOGIN', payload: token});
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else if (error instanceof Error) {
        console.error('Unexpected error:', error.message);
      } else {
        console.error('An error occurred');
      }

      throw new Error('Unknown error occurred');
    }
  }, []);

  const logout = useCallback(() => {
    dispatch({type: 'LOGOUT'});
    closeWindow();
  }, [closeWindow]);

  const register = useCallback(async (data: RegUserData) => {
    // We need to save the Token in some Secure storage
    try {
      const token = await registerUser(data);
      dispatch({type: 'LOGIN', payload: token});
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else if (error instanceof Error) {
        console.error('Unexpected error:', error.message);
      } else {
        console.error('An error occurred');
      }

      throw new Error('Unknown error occurred');
    }
  }, []);

  const authContext = useMemo(
    () => ({
      token: state.token,
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
