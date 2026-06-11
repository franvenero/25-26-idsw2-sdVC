import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, AuthState } from '../types/auth';
import { UserLoginSchema } from '../types/schemas';
import authService from '../services/auth.service';

interface AuthContextType extends AuthState {
  login: (credentials: UserLoginSchema) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: authService.getToken(),
    isAuthenticated: !!authService.getToken(),
    isLoading: true,
  });

  const logout = useCallback(() => {
    authService.removeToken();
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const login = async (credentials: UserLoginSchema) => {
    try {
      const response = await authService.login(credentials);
      authService.setToken(response.access_token);
      
      const user = await authService.getMe();
      
      setState({
        user,
        token: response.access_token,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      logout();
      throw error;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getToken();
      if (token) {
        try {
          const user = await authService.getMe();
          setState({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          logout();
        }
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initAuth();
  }, [logout]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
