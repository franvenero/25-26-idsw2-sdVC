import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useMembers } from '../../hooks/useMembers';
import { TaskCreateSchema } from '../../types/schemas';
import { UserRole } from '../../types/auth';

interface TaskFormProps {
  onAdd: (data: TaskCreateSchema) => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const { user } = useAuth();
  const { members, loading: membersLoading } = useMembers();
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
      await onAdd({ 
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
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Crear Nueva Tarea</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="¿Qué hay que hacer?"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción (Opcional)</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none resize-y"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalles adicionales..."
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Asignar a</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            value={assignedToId} 
            onChange={(e) => setAssignedToId(e.target.value)}
            disabled={membersLoading}
          >
            {membersLoading ? (
              <option>Cargando miembros...</option>
            ) : (
              <>
                <option value={user?.id}>Asignarme a mí ({user?.username})</option>
                {members
                  .filter(m => m.id !== user?.id && m.is_active)
                  .map(member => (
                    <option key={member.id} value={member.id}>
                      {member.username} ({member.email})
                    </option>
                  ))
                }
              </>
            )}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded font-bold text-white transition-colors ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Creando...' : 'Añadir Tarea'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
