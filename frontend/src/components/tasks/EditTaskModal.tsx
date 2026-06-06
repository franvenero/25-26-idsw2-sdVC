import React, { useState } from 'react';
import { TaskResponse, TaskUpdateSchema, TaskStatus } from '../../types/schemas';
import { UserResponse } from '../../types/user';

interface EditTaskModalProps {
  task: TaskResponse;
  members: UserResponse[];
  onClose: () => void;
  onUpdate: (taskId: number, data: TaskUpdateSchema) => Promise<void>;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, members, onClose, onUpdate }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [assignedToId, setAssignedToId] = useState<string>(task.assigned_to_id || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onUpdate(task.id, { 
        title, 
        description, 
        status,
        assigned_to_id: assignedToId
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-xl animate-in fade-in zoom-in duration-200">
        <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Editar Tarea</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Estado</label>
              <select
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
              >
                <option value={TaskStatus.PENDIENTE}>Pendiente</option>
                <option value={TaskStatus.EN_PROGRESO}>En Progreso</option>
                <option value={TaskStatus.COMPLETADA}>Completada</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Asignar a</label>
              <select
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={assignedToId}
                onChange={(e) => setAssignedToId(e.target.value)}
              >
                <option value="">Sin asignar</option>
                {members.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.username}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex space-x-3 justify-end mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded font-semibold text-white transition-colors ${
                isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
