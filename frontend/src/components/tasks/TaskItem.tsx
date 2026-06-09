import React, { useState } from 'react';
import { Task, TaskUpdate } from '../../types/task';
import { UserResponse } from '../../types/user';
import EditTaskModal from './EditTaskModal';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

interface TaskItemProps {
  task: Task;
  allTasks: Task[];
  members: UserResponse[];
  onUpdate: (taskId: string, data: TaskUpdate) => Promise<any>;
  onDelete: (taskId: string) => Promise<void>;
  onAddDependencies: (taskId: string, dependencyIds: string[]) => Promise<any>;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  allTasks, 
  members, 
  onUpdate, 
  onDelete,
  onAddDependencies 
}) => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDepMenu, setShowDepMenu] = useState(false);
  const [isSavingDep, setIsSavingDep] = useState(false);

  const isAdmin = user?.role === UserRole.ADMIN || user?.role === UserRole.ADMIN_MEMBER;
  const isOwner = task.owner_id === user?.id;
  const canEdit = isAdmin || isOwner;

  const assignedUser = members.find(m => m.id === task.assigned_to_id);
  const assignedName = assignedUser ? assignedUser.username : (task.assigned_to_id === user?.id ? 'Tú' : 'Sin asignar');

  const handleToggleComplete = async () => {
    try {
      await onUpdate(task.id, { is_completed: !task.is_completed });
    } catch (err) {}
  };

  const handleDelete = async () => {
    if (window.confirm('¿Eliminar esta tarea?')) {
      await onDelete(task.id);
    }
  };

  const handleAddDependency = async (depId: string) => {
    if (depId === task.id) return;
    setIsSavingDep(true);
    try {
      await onAddDependencies(task.id, [depId]);
      setShowDepMenu(false);
    } catch (err) {
    } finally {
      setIsSavingDep(false);
    }
  };

  const availableTasks = allTasks.filter(t => t.id !== task.id && !task.dependencies.some(d => d.id === t.id));

  return (
    <div className={`group relative bg-white border border-slate-100 rounded-2xl p-5 transition-all hover:shadow-md hover:border-slate-200 ${task.is_completed ? 'opacity-60' : ''}`}>
      <div className="flex gap-4">
        {/* Checkbox */}
        <div className="pt-0.5">
          <input
            type="checkbox"
            checked={task.is_completed}
            onChange={handleToggleComplete}
            className="w-5 h-5 rounded-lg border-2 border-slate-200 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer transition-all"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h4 className={`text-base font-bold truncate ${task.is_completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
              {task.title}
            </h4>
            <span className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              task.is_completed 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                : 'bg-amber-50 text-amber-600 border-amber-100'
            }`}>
              {task.is_completed ? 'Listo' : 'Pendiente'}
            </span>
          </div>

          {task.description && (
            <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-3">
              {task.description}
            </p>
          )}

          {/* Metadata Footer */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-auto">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                {assignedName.slice(0, 2)}
              </div>
              <span className="text-xs font-bold text-slate-400">@{assignedName}</span>
            </div>

            {task.dependencies && task.dependencies.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Depende de</span>
                <div className="flex -space-x-2">
                  {task.dependencies.map(dep => (
                    <div key={dep.id} title={dep.title} className="w-6 h-6 bg-blue-50 border border-white rounded-full flex items-center justify-center text-[8px] font-black text-blue-600 shadow-sm cursor-help hover:z-10 transition-all">
                      {dep.title.slice(0,1)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions Menu */}
        <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
          <div className="relative">
            <button
              onClick={() => setShowDepMenu(!showDepMenu)}
              className={`p-2 rounded-xl transition-all ${showDepMenu ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}
              title="Vincular"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
            
            {showDepMenu && (
              <div className="absolute right-0 bottom-full mb-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 p-2 animate-in fade-in zoom-in duration-200">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1.5 border-b border-slate-50 mb-1">Elegir predecesor</p>
                <div className="max-h-40 overflow-y-auto">
                  {availableTasks.length > 0 ? (
                    availableTasks.map(t => (
                      <button
                        key={t.id}
                        onClick={() => handleAddDependency(t.id)}
                        disabled={isSavingDep}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all truncate"
                      >
                        {t.title}
                      </button>
                    ))
                  ) : (
                    <p className="p-4 text-center text-slate-300 text-[10px] font-bold uppercase italic">Sin opciones</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {canEdit && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
              title="Ajustes"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}

          {isAdmin && (
            <button
              onClick={handleDelete}
              className="p-2 bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
              title="Borrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {isEditModalOpen && (
        <EditTaskModal
          task={task}
          members={members}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default TaskItem;
