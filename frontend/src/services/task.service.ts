import api from './api';
import { TaskResponse, TaskCreateSchema, TaskUpdateSchema, TaskStatusUpdateSchema } from '../types/schemas';

const taskService = {
  getTasks: async (): Promise<TaskResponse[]> => {
    const response = await api.get<TaskResponse[]>('/tasks/');
    return response.data;
  },

  createTask: async (taskData: TaskCreateSchema): Promise<TaskResponse> => {
    const response = await api.post<TaskResponse>('/tasks/', taskData);
    return response.data;
  },

  updateTask: async (taskId: number, taskData: TaskUpdateSchema): Promise<TaskResponse> => {
    const response = await api.put<TaskResponse>(`/tasks/${taskId}`, taskData);
    return response.data;
  },

  updateTaskStatus: async (taskId: number, statusData: TaskStatusUpdateSchema): Promise<TaskResponse> => {
    const response = await api.patch<TaskResponse>(`/tasks/${taskId}/status`, statusData);
    return response.data;
  },

  deleteTask: async (taskId: number): Promise<void> => {
    await api.delete(`/tasks/${taskId}`);
  },
};

export default taskService;
