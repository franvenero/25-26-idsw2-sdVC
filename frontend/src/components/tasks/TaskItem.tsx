import React from 'react';
import { TaskResponse, TaskStatus } from '../../types/schemas';

interface TaskItemProps {
  task: TaskResponse;
  onStatusChange: (taskId: number, newStatus: TaskStatus) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, e.target.value as TaskStatus);
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
        <h3 style={{ margin: 0, color: '#2c3e50' }}>{task.title}</h3>
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
      </div>
      
      {task.description && (
        <p style={{ margin: '0.5rem 0', color: '#7f8c8d', fontSize: '0.95rem' }}>
          {task.description}
        </p>
      )}

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '0.85rem', color: '#95a5a6' }}>
          Creada: {new Date(task.created_at).toLocaleDateString()}
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
    </div>
  );
};

export default TaskItem;
