import React, { useState } from 'react';
import { TaskResponse, TaskStatus, TaskUpdateSchema } from '../../types/schemas';
import EditTaskModal from './EditTaskModal';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

interface TaskItemProps {
  task: TaskResponse;
  onStatusChange: (taskId: number, newStatus: TaskStatus) => void;
  onUpdate: (taskId: number, data: TaskUpdateSchema) => Promise<void>;
  onDelete: (taskId: number) => Promise<void>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isAdmin = user?.role === UserRole.ADMIN || user?.role === UserRole.ADMIN_MEMBER;
  const isOwner = task.creator_id === user?.id;
  const canEdit = isAdmin || isOwner;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, e.target.value as TaskStatus);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      await onDelete(task.id);
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETADA: return '#27ae60';
      case TaskStatus.EN_PROGRESO: return '#f39c12';
      default: return '#7f8c8d';
    }
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ margin: 0, color: '#2c3e50' }}>{task.title}</h3>
          <div style={{ fontSize: '0.75rem', color: '#95a5a6', marginTop: '0.2rem' }}>
            ID: {task.id} {task.group_id && `| Grupo: ${task.group_id}`}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            backgroundColor: getStatusColor(task.status),
            color: '#fff'
          }}>
            {task.status}
          </span>
          {canEdit && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              style={iconButtonStyle}
              title="Editar"
            >
              ✏️
            </button>
          )}
          {isAdmin && (
            <button
              onClick={handleDelete}
              style={{ ...iconButtonStyle, backgroundColor: '#fdeaea' }}
              title="Eliminar"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
      
      {task.description && (
        <p style={{ margin: '0.5rem 0', color: '#7f8c8d', fontSize: '0.95rem' }}>
          {task.description}
        </p>
      )}

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#95a5a6' }}>
            Asignada a: {task.assigned_to_id || 'Sin asignar'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#bdc3c7' }}>
            Creada: {new Date(task.created_at).toLocaleString()}
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor={`status-${task.id}`} style={{ fontSize: '0.85rem', fontWeight: 600 }}>Estado:</label>
          <select
            id={`status-${task.id}`}
            value={task.status}
            onChange={handleStatusChange}
            style={{
              padding: '0.3rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: '#fff',
              cursor: 'pointer'
            }}
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
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

const iconButtonStyle: React.CSSProperties = {
  background: 'none',
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '0.2rem 0.4rem',
  cursor: 'pointer',
  fontSize: '0.9rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.2s'
};

export default TaskItem;
