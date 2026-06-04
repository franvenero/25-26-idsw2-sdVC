import React from 'react';
import TaskItem from './TaskItem';
import { TaskResponse, TaskStatus } from '../../types/schemas';

interface TaskListProps {
  tasks: TaskResponse[];
  isLoading: boolean;
  error: string | null;
  onStatusChange: (taskId: number, newStatus: TaskStatus) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, isLoading, error, onStatusChange }) => {
  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: '#7f8c8d' }}>Cargando tareas...</div>;
  }

  if (error) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        color: '#e74c3c',
        backgroundColor: '#fdeaea',
        borderRadius: '8px',
        border: '1px solid #fab1a0'
      }}>
        {error}
      </div>
    );
  }

  if (tasks.length === 0) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: '#95a5a6' }}>No hay tareas disponibles.</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
        Listado de Tareas
      </h3>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
};

export default TaskList;
