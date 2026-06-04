import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TaskCreateSchema } from '../../types/schemas';
import { UserRole } from '../../types/auth';

interface TaskFormProps {
  onSubmit: (data: TaskCreateSchema) => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedToId, setAssignedToId] = useState<string>(user?.id || '');
  const [isLoading, setIsLoading] = useState(false);

  // RBAC: Solo administradores pueden crear tareas
  const canCreate = user?.role === UserRole.ADMIN || user?.role === UserRole.ADMIN_MEMBER;

  if (!canCreate) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      // Alineación con el diseño: enviamos assigned_to_id.
      // Actualmente se auto-asigna al creador (admin) por falta de módulo de miembros.
      await onSubmit({ 
        title, 
        description, 
        assigned_to_id: assignedToId 
      });
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px solid #ddd',
      marginBottom: '2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#2c3e50' }}>Crear Nueva Tarea</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="¿Qué hay que hacer?"
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Descripción (Opcional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalles adicionales..."
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>
        
        <div>
          <label style={labelStyle}>Asignar a</label>
          <select 
            value={assignedToId} 
            onChange={(e) => setAssignedToId(e.target.value)}
            style={inputStyle}
          >
            {/* 
              TODO: Inyectar listado real de miembros del grupo cuando el módulo esté disponible.
              Por ahora, solo permitimos auto-asignación al administrador actual.
            */}
            <option value={user?.id}>{user?.username} (Tú)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            ...buttonStyle,
            backgroundColor: isLoading ? '#95a5a6' : '#3498db',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Creando...' : 'Añadir Tarea'}
        </button>
      </form>
    </div>
  );
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '0.4rem',
  fontWeight: 600,
  fontSize: '0.9rem',
  color: '#34495e'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.7rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  boxSizing: 'border-box'
};

const buttonStyle: React.CSSProperties = {
  padding: '0.8rem',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 700,
  fontSize: '1rem',
  marginTop: '0.5rem',
  transition: 'background-color 0.2s'
};

export default TaskForm;
