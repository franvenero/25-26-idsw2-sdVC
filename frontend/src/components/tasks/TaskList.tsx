import React from 'react';
import TaskItem from './TaskItem';
import { Task, TaskUpdate } from '../../types/task';
import { UserResponse } from '../../types/user';

interface TaskListProps {
  tasks: Task[];
  allTasks: Task[];
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
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl font-medium flex items-center gap-3">
          <span className="text-lg">🚫</span>
          {error}
        </div>
      )}
      
      {tasks.length === 0 && !error ? (
        <div className="py-20 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center px-6">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl text-slate-300">✨</span>
          </div>
          <h4 className="text-lg font-bold text-slate-900">Todo listo</h4>
          <p className="text-sm text-slate-400 mt-1">No tienes tareas pendientes por el momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
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
      )}
    </div>
  );
};

export default TaskList;
