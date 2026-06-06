import React from 'react';
import TaskItem from './TaskItem';
import { TaskResponse, TaskStatus, TaskUpdateSchema } from '../../types/schemas';
import { UserResponse } from '../../types/user';

interface TaskListProps {
  tasks: TaskResponse[];
  members: UserResponse[];
  isLoading: boolean;
  error: string | null;
  onStatusChange: (taskId: number, newStatus: TaskStatus) => void;
  onUpdate: (taskId: number, data: TaskUpdateSchema) => Promise<void>;
  onDelete: (taskId: number) => Promise<void>;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  members,
  isLoading, 
  error, 
  onStatusChange, 
  onUpdate, 
  onDelete 
}) => {
  if (isLoading) {
    return <div className="text-center p-8 text-gray-500">Cargando tareas...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600 bg-red-50 rounded-lg border border-red-200">
        {error}
      </div>
    );
  }

  if (tasks.length === 0) {
    return <div className="text-center p-8 text-gray-400">No hay tareas disponibles.</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">
        Listado de Tareas
      </h3>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          members={members}
          onStatusChange={onStatusChange} 
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
