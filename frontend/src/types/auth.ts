export enum UserRole {
  ADMIN = "Administrador",
  ADMIN_MEMBER = "Miembro Administrador",
  MEMBER = "Miembro",
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  is_active: boolean;
  group_id?: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
