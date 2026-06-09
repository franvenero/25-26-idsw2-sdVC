import React from 'react';
import TaskItem from './TaskItem';
import { Task, TaskUpdate } from '../../types/task';
import { UserResponse } from '../../types/user';

interface TaskListProps {
  tasks: Task[];
  allTasks: Task[]; // Para poder seleccionar dependencias de cualquier tarea
  members: UserResponse[];
  isLoading: boolean;
  error: string | null;
  onUpdate: (taskId: string, data: TaskUpdate) => Promise<any>;
  onDelete: (taskId: string) => Promise<void>;
  onAddDependencies: (taskId: string, dependencyIds: string[]) => Promise<any>;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  allTasks,
  members,
  isLoading, 
  error, 
  onUpdate, 
  onDelete,
  onAddDependencies
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-500">Cargando tareas...</span>
      </div>
    );
  }

  if (tasks.length === 0 && !error) {
    return (
      <div className="text-center p-12 bg-white rounded-xl border-2 border-dashed border-gray-200">
        <p className="text-gray-400 text-lg">No hay tareas pendientes en este grupo.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow-sm animate-pulse">
          <div className="flex items-center">
            <span className="mr-2">⚠️</span>
            <p className="font-medium">{error}</p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6">
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            allTasks={allTasks}
            members={members}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onAddDependencies={onAddDependencies}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
