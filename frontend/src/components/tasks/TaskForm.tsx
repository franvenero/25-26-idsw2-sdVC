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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 ml-1">¿Qué hay que hacer?</label>
            <input
              type="text"
              placeholder="Ej: Comprar leche, Arreglar el grifo..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-xl p-3 focus:border-blue-500 focus:ring-0 outline-none transition-all text-lg font-medium"
              disabled={isSubmitting}
              required
            />
          </div>
        </div>
        
        <div className={`overflow-hidden transition-all duration-300 ${title ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 ml-1">Detalles adicionales (opcional)</label>
          <textarea
            placeholder="Añade una descripción más detallada..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-2 border-gray-100 rounded-xl p-3 focus:border-blue-500 focus:ring-0 outline-none transition-all resize-none h-24"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            {isSubmitting ? 'Creando...' : 'Crear Tarea'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
