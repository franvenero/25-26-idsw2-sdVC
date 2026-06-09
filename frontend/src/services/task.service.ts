import api from './api';
import { Task, TaskCreate, TaskUpdate, TaskDependencyCreate } from '../types/task';

const taskService = {
  /**
   * Obtiene todas las tareas activas del grupo.
   */
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks/');
    return response.data;
  },

  /**
   * Crea una nueva tarea.
   */
  createTask: async (taskData: TaskCreate): Promise<Task> => {
    const response = await api.post<Task>('/tasks/', taskData);
    return response.data;
  },

  /**
   * Actualiza una tarea existente.
   * Maneja el completado condicionado por dependencias.
   */
  updateTask: async (taskId: string, taskData: TaskUpdate): Promise<Task> => {
    const response = await api.patch<Task>(`/tasks/${taskId}`, taskData);
    return response.data;
  },

  /**
   * Borrado lógico de una tarea.
   */
  deleteTask: async (taskId: string): Promise<void> => {
    await api.delete(`/tasks/${taskId}`);
  },

  /**
   * Establece relaciones de dependencia entre tareas.
   * Lanza error 400 si se detecta circularidad.
   */
  addDependencies: async (taskId: string, depends_on_ids: string[]): Promise<Task> => {
    const response = await api.post<Task>(`/tasks/${taskId}/dependencies`, {
      depends_on_ids
    } as TaskDependencyCreate);
    return response.data;
  },
};

export default taskService;
