import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Users, 
  Plus, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Clock, 
  LayoutDashboard,
  Settings,
  LogOut,
  Folder
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Interfaces para Mock Data
interface Group {
  id: string;
  name: string;
  color: string;
}

interface Task {
  id: string;
  title: string;
  is_completed: boolean;
  group_id: string;
}

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  
  // Estado para el grupo seleccionado
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  
  // Mock Data: Grupos
  const [groups] = useState<Group[]>([
    { id: 'group-1', name: 'Casa', color: 'bg-emerald-500' },
    { id: 'group-2', name: 'Trabajo', color: 'bg-blue-500' },
    { id: 'group-3', name: 'Gimnasio', color: 'bg-purple-500' },
  ]);

  // Mock Data: Tareas
  const [tasks] = useState<Task[]>([
    { id: '1', title: 'Comprar leche', is_completed: false, group_id: 'group-1' },
    { id: '2', title: 'Lavar la ropa', is_completed: true, group_id: 'group-1' },
    { id: '3', title: 'Enviar reporte trimestral', is_completed: false, group_id: 'group-2' },
    { id: '4', title: 'Reunión de equipo', is_completed: false, group_id: 'group-2' },
    { id: '5', title: 'Rutina de pierna', is_completed: false, group_id: 'group-3' },
  ]);

  // Filtrar tareas por el grupo seleccionado
  const filteredTasks = selectedGroup 
    ? tasks.filter(task => task.group_id === selectedGroup.id)
    : [];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* SIDEBAR: Gestión de Grupos */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-600 p-2 rounded-lg">
              <LayoutDashboard size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">BREÑOTASK</span>
          </div>

          <nav className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4 text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Mis Grupos</span>
                <button 
                  className="hover:text-white transition-colors"
                  title="Crear Nuevo Grupo"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <ul className="space-y-2">
                {groups.map((group) => (
                  <li key={group.id}>
                    <button
                      onClick={() => setSelectedGroup(group)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                        selectedGroup?.id === group.id 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${group.color}`}></div>
                      <span className="flex-1 text-left text-sm font-medium">{group.name}</span>
                      {selectedGroup?.id === group.id && <ChevronRight size={14} />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
              {user?.username?.substring(0, 2).toUpperCase() || 'US'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.username || 'Usuario'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.role || 'Miembro'}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-2 text-slate-400 hover:text-red-400 text-sm transition-colors"
          >
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header Superior */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center gap-2">
            <Folder size={20} className="text-slate-400" />
            <span className="text-slate-400">/</span>
            <span className="font-medium text-slate-700">
              {selectedGroup ? selectedGroup.name : 'Selecciona un grupo'}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Settings size={20} className="text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" />
          </div>
        </header>

        {/* Contenido Dinámico */}
        <div className="flex-1 overflow-y-auto p-8">
          {selectedGroup ? (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Tareas de: {selectedGroup.name}</h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Gestiona las actividades pendientes para este contexto.
                  </p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all font-medium">
                  <Plus size={18} />
                  Crear Tarea
                </button>
              </div>

              {/* Lista de Tareas */}
              <div className="grid gap-4">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <div 
                      key={task.id} 
                      className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all flex items-center gap-4 group"
                    >
                      <button className="text-slate-300 hover:text-blue-500 transition-colors">
                        {task.is_completed ? (
                          <CheckCircle2 className="text-emerald-500" />
                        ) : (
                          <Circle />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={`text-slate-700 font-medium ${task.is_completed ? 'line-through text-slate-400' : ''}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock size={12} className="text-slate-400" />
                          <span className="text-xs text-slate-400">Creada recientemente</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium italic">No hay tareas en este grupo.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="bg-blue-50 p-6 rounded-full mb-6">
                <Users size={48} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Bienvenido a BREÑOTASK</h3>
              <p className="text-slate-500 max-w-sm">
                Selecciona un grupo en el menú lateral para comenzar a gestionar tus tareas y coordinar con tu equipo.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
