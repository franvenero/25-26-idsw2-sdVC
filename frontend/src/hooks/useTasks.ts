import { useState, useEffect, useCallback } from 'react';
import taskService from '../services/task.service';
import { Task, TaskCreate, TaskUpdate } from '../types/task';
import axios from 'axios';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
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

  const createTask = async (taskData: TaskCreate) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError('Error al crear la tarea');
      throw err;
    }
  };

  const updateTask = async (taskId: string, taskData: TaskUpdate) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, taskData);
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        const message = err.response.data.detail || 'Conflicto de dependencias';
        setError(message);
        throw new Error(message);
      }
      setError('Error al actualizar la tarea');
      throw err;
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await taskService.deleteTask(taskId);
      // Borrado lógico: desaparece de la vista local
      setTasks(prev => prev.filter(t => t.id !== taskId));
    } catch (err) {
      setError('Error al eliminar la tarea');
      throw err;
    }
  };

  const addDependencies = async (taskId: string, dependencyIds: string[]) => {
    try {
      const updatedTask = await taskService.addDependencies(taskId, dependencyIds);
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        const message = err.response.data.detail || 'Error de circularidad detectado';
        setError(message);
        throw new Error(message);
      }
      setError('Error al establecer dependencias');
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
    setError, // Permitimos resetear el error desde la UI
    refreshTasks: fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    addDependencies
  };
};
