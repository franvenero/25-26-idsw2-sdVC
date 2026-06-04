export enum UserRole {
  ADMIN = "ADMIN",
  ADMIN_MEMBER = "ADMIN_MEMBER",
  MEMBER = "MEMBER",
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  is_active: boolean;
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
