import React, { useState } from 'react';
import { TaskResponse, TaskStatus, TaskUpdateSchema } from '../../types/schemas';
import { UserResponse } from '../../types/user';
import EditTaskModal from './EditTaskModal';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

interface TaskItemProps {
  task: TaskResponse;
  members: UserResponse[];
  onStatusChange: (taskId: number, newStatus: TaskStatus) => void;
  onUpdate: (taskId: number, data: TaskUpdateSchema) => Promise<void>;
  onDelete: (taskId: number) => Promise<void>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, members, onStatusChange, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isAdmin = user?.role === UserRole.ADMIN || user?.role === UserRole.ADMIN_MEMBER;
  const isOwner = task.creator_id === user?.id;
  const canEdit = isAdmin || isOwner;

  // Encontrar el nombre del usuario asignado
  const assignedUser = members.find(m => m.id === task.assigned_to_id);
  const assignedName = assignedUser ? assignedUser.username : (task.assigned_to_id === user?.id ? `${user.username} (Tú)` : 'Desconocido');

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, e.target.value as TaskStatus);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      await onDelete(task.id);
    }
  };

  const getStatusBadgeClass = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETADA: return 'bg-green-500 text-white';
      case TaskStatus.EN_PROGRESO: return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col space-y-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
          <div className="text-xs text-gray-400 mt-1">
            ID: {task.id} {task.group_id && `| Grupo: ${task.group_id}`}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-bold px-2 py-1 rounded ${getStatusBadgeClass(task.status)}`}>
            {task.status}
          </span>
          {canEdit && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-1 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              title="Editar"
            >
              ✏️
            </button>
          )}
          {isAdmin && (
            <button
              onClick={handleDelete}
              className="p-1 border border-red-100 bg-red-50 rounded hover:bg-red-100 transition-colors"
              title="Eliminar"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
      
      {task.description && (
        <p className="text-gray-600 text-sm">
          {task.description}
        </p>
      )}

      <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-end">
        <div className="flex flex-col space-y-1">
          <div className="text-sm font-medium text-gray-700">
            <span className="text-gray-400 font-normal">Asignada a:</span> {assignedName}
          </div>
          <div className="text-xs text-gray-400">
            Creada: {new Date(task.created_at).toLocaleString()}
          </div>
        </div>
        
        <div className="flex flex-col space-y-1 items-end">
          <label htmlFor={`status-${task.id}`} className="text-xs font-semibold text-gray-500">Cambiar Estado:</label>
          <select
            id={`status-${task.id}`}
            value={task.status}
            onChange={handleStatusChange}
            className="text-sm border border-gray-300 rounded p-1 bg-white cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value={TaskStatus.PENDIENTE}>Pendiente</option>
            <option value={TaskStatus.EN_PROGRESO}>En Progreso</option>
            <option value={TaskStatus.COMPLETADA}>Completada</option>
          </select>
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
