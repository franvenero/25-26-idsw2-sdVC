import { useState, useEffect, useCallback } from 'react';
import taskService from '../services/task.service';
import { TaskResponse, TaskCreateSchema, TaskUpdateSchema, TaskStatus } from '../types/schemas';

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las tareas');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTask = async (taskData: TaskCreateSchema) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError('Error al crear la tarea');
      throw err;
    }
  };

  const updateTask = async (taskId: number, taskData: TaskUpdateSchema) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, taskData);
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
    } catch (err) {
      setError('Error al actualizar la tarea');
      throw err;
    }
  };

  const updateTaskStatus = async (taskId: number, status: TaskStatus) => {
    try {
      const updatedTask = await taskService.updateTaskStatus(taskId, { status });
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
    } catch (err) {
      setError('Error al actualizar el estado');
      throw err;
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
    } catch (err) {
      setError('Error al eliminar la tarea');
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    isLoading,
    error,
    refreshTasks: fetchTasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask
  };
};
