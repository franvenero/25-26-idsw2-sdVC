export interface UserLoginSchema {
  username: string;
  password: string;
}

export enum TaskStatus {
  PENDIENTE = "PENDIENTE",
  EN_PROGRESO = "EN_PROGRESO",
  COMPLETADA = "COMPLETADA",
}

export interface TaskCreateSchema {
  title: string;
  description?: string;
  assigned_to_id?: string;
}

export interface TaskUpdateSchema {
  title?: string;
  description?: string;
  status?: TaskStatus;
  assigned_to_id?: string;
}

export interface TaskStatusUpdateSchema {
  status: TaskStatus;
}

export interface TaskResponse {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  creator_id: string;
  assigned_to_id?: string;
  created_at: string;
  updated_at?: string;
}
