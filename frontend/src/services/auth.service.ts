import api from './api';
import { UserLoginSchema } from '../types/schemas';
import { TokenResponse, User } from '../types/auth';

const authService = {
  login: async (credentials: UserLoginSchema): Promise<TokenResponse> => {
    const response = await api.post<TokenResponse>('/auth/login', credentials);
    return response.data;
  },

  getMe: async (): Promise<User> => {
    // Endpoint para obtener info del usuario actual (se implementará en el backend próximamente)
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  setToken: (token: string) => {
    localStorage.setItem('token', token);
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  removeToken: () => {
    localStorage.removeItem('token');
  }
};

export default authService;
