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
    } catch (err) {
      // El error ya lo maneja el hook useTasks y se muestra en TaskList
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea (borrado lógico)?')) {
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
      // Manejado por useTasks
    } finally {
      setIsSavingDep(false);
    }
  };

  // Filtrar tareas que pueden ser dependencias (no ella misma, no eliminadas)
  const availableTasks = allTasks.filter(t => t.id !== task.id && !task.dependencies.some(d => d.id === t.id));

  return (
    <div className={`bg-white border rounded-xl p-5 shadow-sm transition-all hover:shadow-md ${task.is_completed ? 'border-green-200 bg-green-50/30' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            checked={task.is_completed}
            onChange={handleToggleComplete}
            className="mt-1.5 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${task.is_completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-gray-600 text-sm mt-1 line-clamp-2 italic">
                {task.description}
              </p>
            )}
            
            {/* Dependencias actuales */}
            {task.dependencies && task.dependencies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 self-center">Depende de:</span>
                {task.dependencies.map(dep => (
                  <span key={dep.id} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    {dep.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {/* Botón de Dependencias */}
          <div className="relative">
            <button
              onClick={() => setShowDepMenu(!showDepMenu)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Añadir Dependencia"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
            
            {showDepMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-10 p-2 animate-in fade-in zoom-in duration-200">
                <div className="text-xs font-bold text-gray-400 px-2 py-1 uppercase border-b border-gray-100 mb-1">
                  Vincular tarea previa
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {availableTasks.length > 0 ? (
                    availableTasks.map(t => (
                      <button
                        key={t.id}
                        onClick={() => handleAddDependency(t.id)}
                        disabled={isSavingDep}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded transition-colors truncate flex items-center justify-between"
                      >
                        <span>{t.title}</span>
                        <span className="text-[10px] text-gray-400">ID: {t.id.slice(0,4)}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-4 text-center text-gray-400 text-xs italic">
                      No hay más tareas disponibles
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {canEdit && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors"
              title="Editar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          
          {isAdmin && (
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Eliminar (Borrado Lógico)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700 uppercase">
            {assignedName.slice(0,2)}
          </div>
          <span className="text-xs font-medium text-gray-500">
            Asignada a: <span className="text-gray-900">{assignedName}</span>
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${task.is_completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {task.is_completed ? 'Completada' : 'Pendiente'}
          </span>
          <span className="text-[10px] text-gray-400">
            ID: {task.id.slice(0, 8)}...
          </span>
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
