import React, { useState } from 'react';
import { Task, TaskUpdate } from '../../types/task';
import { UserResponse } from '../../types/user';

interface EditTaskModalProps {
  task: Task;
  members: UserResponse[];
  onClose: () => void;
  onUpdate: (taskId: string, data: TaskUpdate) => Promise<any>;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, members, onClose, onUpdate }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [assignedToId, setAssignedToId] = useState(task.assigned_to_id || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onUpdate(task.id, {
        title,
        description,
        assigned_to_id: assignedToId || undefined
      });
      onClose();
    } catch (err) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-slate-50">
          <h2 className="text-xl font-bold text-slate-900">Detalles de Tarea</h2>
          <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-widest">ID: {task.id.slice(0,8)}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-slate-200 rounded-xl p-2.5 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-slate-200 rounded-xl p-2.5 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Asignar a</label>
            <select
              value={assignedToId}
              onChange={(e) => setAssignedToId(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-2.5 text-sm font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-white"
            >
              <option value="">Sin asignar</option>
              {members.map(member => (
                <option key={member.id} value={member.id}>
                  {member.username}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              Cerrar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all disabled:bg-slate-100 disabled:text-slate-400"
            >
              {isSubmitting ? 'Guardando...' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
