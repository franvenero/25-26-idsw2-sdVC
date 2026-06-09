import React, { useState } from 'react';
import { TaskCreate } from '../../types/task';

interface TaskFormProps {
  onAdd: (task: TaskCreate) => Promise<any>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onAdd({
        title: title.trim(),
        description: description.trim() || undefined
      });
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Título</label>
        <input
          type="text"
          placeholder="Ej: Revisar informe"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-slate-200 rounded-xl p-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all"
          disabled={isSubmitting}
          required
        />
      </div>
      
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Descripción</label>
        <textarea
          placeholder="Breve detalle..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-slate-200 rounded-xl p-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all resize-none h-24"
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-xl transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/10 active:scale-[0.98] disabled:bg-slate-100 disabled:text-slate-400"
      >
        {isSubmitting ? 'Guardando...' : 'Añadir Tarea'}
      </button>
    </form>
  );
};

export default TaskForm;
