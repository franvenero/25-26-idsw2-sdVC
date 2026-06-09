import { User } from './user';

/**
 * Representa el estado de una tarea.
 * Aunque el backend usa booleanos (is_completed), 
 * el frontend puede mapearlo o usar directamente el booleano.
 * Para consistencia con el backend:
 */
export interface Task {
  id: string;
  title: string;
  description?: string;
  is_completed: boolean;
  is_deleted: boolean;
  owner_id: string;
  assigned_to_id?: string;
  group_id: string;
  dependencies: Task[];
}

export interface TaskCreate {
  title: string;
  description?: string;
  assigned_to_id?: string;
  depends_on_ids?: string[];
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  is_completed?: boolean;
  assigned_to_id?: string;
}

export interface TaskDependencyCreate {
  depends_on_ids: string[];
}
