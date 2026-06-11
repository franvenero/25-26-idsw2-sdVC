import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Clock, 
  LayoutDashboard,
  Settings,
  LogOut,
  Folder,
  Users,
  X,
  UserPlus,
  Mail,
  AlertCircle,
  Hash
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Interfaces
interface Group {
  id: string;
  name: string;
  color: string;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  assigned_to?: string;
  is_completed: boolean;
  group_id: string;
  depends_on_id?: string;
}

interface UserMock {
  id: string;
  username: string;
}

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  
  // Estados de Modales
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  
  // Estado para el grupo seleccionado
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  
  // Mock Data: Grupos
  const [groups] = useState<Group[]>([
    { id: 'group-1', name: 'Casa', color: 'bg-emerald-500' },
    { id: 'group-2', name: 'Trabajo', color: 'bg-blue-500' },
    { id: 'group-3', name: 'Gimnasio', color: 'bg-purple-500' },
  ]);

  // Mock Data: Usuarios para asignación
  const [availableUsers] = useState<UserMock[]>([
    { id: 'u1', username: 'Juan Pérez' },
    { id: 'u2', username: 'María García' },
    { id: 'u3', username: 'Carlos Ruiz' },
  ]);

  // Mock Data: Tareas
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Comprar leche', is_completed: false, group_id: 'group-1' },
    { id: '2', title: 'Lavar la ropa', is_completed: true, group_id: 'group-1' },
    { id: '3', title: 'Enviar reporte trimestral', is_completed: false, group_id: 'group-2', description: 'Reporte de ventas Q2' },
    { id: '4', title: 'Reunión de equipo', is_completed: false, group_id: 'group-2' },
    { id: '5', title: 'Rutina de pierna', is_completed: false, group_id: 'group-3' },
  ]);

  // Estados de Formulario de Tarea
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assigned_to: '',
    depends_on_id: ''
  });

  // Estado de Formulario de Invitación
  const [inviteEmail, setInviteEmail] = useState('');

  // Filtrar tareas por el grupo seleccionado
  const filteredTasks = selectedGroup 
    ? tasks.filter(task => task.group_id === selectedGroup.id)
    : [];

  // Manejadores de Tareas
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, is_completed: !t.is_completed } : t
    ));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGroup || !newTask.title) return;

    const taskToAdd: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask.title,
      description: newTask.description,
      assigned_to: newTask.assigned_to,
      is_completed: false,
      group_id: selectedGroup.id,
      depends_on_id: newTask.depends_on_id || undefined
    };

    setTasks([...tasks, taskToAdd]);
    setNewTask({ title: '', description: '', assigned_to: '', depends_on_id: '' });
    setIsTaskModalOpen(false);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGroup || !inviteEmail) return;

    console.log(`Invitación enviada a ${inviteEmail} para el grupo ${selectedGroup.name} (ID: ${selectedGroup.id})`);
    alert(`Invitación enviada con éxito a ${inviteEmail}`);
    setInviteEmail('');
    setIsInviteModalOpen(false);
  };

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
                  className="hover:text-white transition-colors p-1 hover:bg-slate-800 rounded"
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
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
              {user?.username?.substring(0, 2).toUpperCase() || 'US'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">{user?.username || 'Usuario'}</p>
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
            {selectedGroup && (
              <button 
                onClick={() => setIsInviteModalOpen(true)}
                className="ml-4 flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-full transition-all"
              >
                <UserPlus size={14} />
                Invitar Miembro
              </button>
            )}
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
                <button 
                  onClick={() => setIsTaskModalOpen(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all font-medium"
                >
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
                      className={`bg-white p-5 rounded-xl border transition-all flex items-center gap-4 group ${
                        task.is_completed ? 'border-slate-100 opacity-75' : 'border-slate-200 shadow-sm hover:border-blue-300'
                      }`}
                    >
                      <button 
                        onClick={() => toggleTaskCompletion(task.id)}
                        className={`transition-colors ${task.is_completed ? 'text-emerald-500' : 'text-slate-300 hover:text-blue-500'}`}
                      >
                        {task.is_completed ? (
                          <CheckCircle2 size={24} />
                        ) : (
                          <Circle size={24} />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-slate-700 font-semibold truncate ${task.is_completed ? 'line-through text-slate-400' : ''}`}>
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 italic">{task.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Clock size={12} className="text-slate-400" />
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Pendiente</span>
                          </div>
                          {task.assigned_to && (
                            <div className="flex items-center gap-1">
                              <Users size={12} className="text-slate-400" />
                              <span className="text-[10px] text-slate-400 font-bold">{task.assigned_to}</span>
                            </div>
                          )}
                          {task.depends_on_id && (
                            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-amber-600">
                              <AlertCircle size={10} />
                              <span className="text-[9px] font-bold uppercase">Bloqueada</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                    <Folder size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-400 font-medium italic">No hay tareas en este grupo.</p>
                    <button 
                      onClick={() => setIsTaskModalOpen(true)}
                      className="mt-4 text-blue-600 font-bold text-sm hover:underline"
                    >
                      Comenzar a añadir tareas
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in duration-500">
              <div className="bg-blue-50 p-6 rounded-full mb-6">
                <Users size={48} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Bienvenido a BREÑOTASK</h3>
              <p className="text-slate-500 max-w-sm text-sm">
                Selecciona un grupo en el menú lateral para comenzar a gestionar tus tareas y coordinar con tu equipo de forma contextualizada.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* MODAL: Crear Tarea */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Nueva Tarea</h3>
              <button onClick={() => setIsTaskModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Título de la Tarea</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                  placeholder="Ej: Revisar documentación técnica"
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Descripción (Opcional)</label>
                <textarea 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm h-24 resize-none"
                  placeholder="Detalles adicionales sobre la tarea..."
                  value={newTask.description}
                  onChange={e => setNewTask({...newTask, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Asignar a</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    value={newTask.assigned_to}
                    onChange={e => setNewTask({...newTask, assigned_to: e.target.value})}
                  >
                    <option value="">Sin asignar</option>
                    {availableUsers.map(u => (
                      <option key={u.id} value={u.username}>{u.username}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Predecesora</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    value={newTask.depends_on_id}
                    onChange={e => setNewTask({...newTask, depends_on_id: e.target.value})}
                  >
                    <option value="">Ninguna</option>
                    {filteredTasks.map(t => (
                      <option key={t.id} value={t.id}>{t.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition-colors text-sm"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all text-sm"
                >
                  Crear Tarea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Invitar Miembro */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <UserPlus size={20} className="text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">Invitar al Grupo</h3>
              </div>
              <button onClick={() => setIsInviteModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSendInvite} className="p-6 space-y-4">
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Envía una invitación para unirse a <span className="font-bold text-slate-900">{selectedGroup?.name}</span>. 
                El usuario recibirá una notificación para aceptar la membresía.
              </p>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Email o Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                    placeholder="usuario@ejemplo.com"
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all text-sm"
                >
                  Enviar Invitación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
