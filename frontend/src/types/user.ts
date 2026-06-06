import { UserRole } from "./auth";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  group_id: string | null;
  is_active: boolean;
}

export interface UserCreate {
  username: string;
  email: string;
  role: UserRole;
  password?: string;
  group_id?: string;
}

export interface UserUpdateRole {
  role: UserRole;
}
