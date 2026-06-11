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
  Trash2,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Interfaces
interface Group {
  id: string;
  name: string;
  members: string[];
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

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  
  // Estados de Modales
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);
  
  // Estado para el grupo seleccionado
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  
  // Mock Data: Grupos (Estado con miembros)
  const [groups, setGroups] = useState<Group[]>([
    { id: 'group-1', name: 'Casa', members: ['Fran', 'Andeco', 'Admin'], color: 'bg-emerald-500' },
    { id: 'group-2', name: 'Trabajo', members: ['Jefe', 'Compañero 1', 'Admin'], color: 'bg-blue-500' },
    { id: 'group-3', name: 'Gimnasio', members: ['Entrenador', 'Admin'], color: 'bg-purple-500' },
  ]);

  // Mock Data: Tareas
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Comprar leche', is_completed: false, group_id: 'group-1' },
    { id: '2', title: 'Lavar la ropa', is_completed: true, group_id: 'group-1' },
    { id: '3', title: 'Enviar reporte trimestral', is_completed: false, group_id: 'group-2', description: 'Reporte de ventas Q2' },
    { id: '4', title: 'Reunión de equipo', is_completed: false, group_id: 'group-2' },
    { id: '5', title: 'Rutina de pierna', is_completed: false, group_id: 'group-3' },
  ]);

  // Estados de Formulario
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assigned_to: '',
    depends_on_id: ''
  });
  const [newGroupName, setNewGroupName] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  // Grupo Seleccionado Activo
  const activeGroup = groups.find(g => g.id === selectedGroupId) || null;

  // Filtrar tareas por el grupo seleccionado
  const filteredTasks = selectedGroupId 
    ? tasks.filter(task => task.group_id === selectedGroupId)
    : [];

  // --- Manejadores de Grupos ---
  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const groupToAdd: Group = {
      id: `group-${Math.random().toString(36).substr(2, 5)}`,
      name: newGroupName,
      members: [user?.username || 'Admin'],
      color: 'bg-slate-500'
    };

    setGroups([...groups, groupToAdd]);
    setNewGroupName('');
    setIsNewGroupModalOpen(false);
    setSelectedGroupId(groupToAdd.id);
  };

  const handleDeleteGroup = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que deseas eliminar este grupo? Se perderán todas sus tareas.')) {
      setGroups(groups.filter(g => g.id !== id));
      if (selectedGroupId === id) {
        setSelectedGroupId(null);
      }
      setTasks(tasks.filter(t => t.group_id !== id));
    }
  };

  // --- Manejadores de Miembros ---
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGroup || !newMemberName.trim()) return;

    const updatedGroups = groups.map(g => {
      if (g.id === activeGroup.id) {
        return { ...g, members: [...g.members, newMemberName.trim()] };
      }
      return g;
    });

    setGroups(updatedGroups);
    setNewMemberName('');
  };

  // --- Manejadores de Tareas ---
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, is_completed: !t.is_completed } : t
    ));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGroupId || !newTask.title) return;

    const taskToAdd: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask.title,
      description: newTask.description,
      assigned_to: newTask.assigned_to,
      is_completed: false,
      group_id: selectedGroupId,
      depends_on_id: newTask.depends_on_id || undefined
    };

    setTasks([...tasks, taskToAdd]);
    setNewTask({ title: '', description: '', assigned_to: '', depends_on_id: '' });
    setIsTaskModalOpen(false);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGroup || !inviteEmail) return;
    console.log(`Invitación enviada a ${inviteEmail} para el grupo ${activeGroup.name}`);
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
                  onClick={() => setIsNewGroupModalOpen(true)}
                  className="hover:text-white transition-colors p-1 hover:bg-slate-800 rounded"
                  title="Crear Nuevo Grupo"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <ul className="space-y-2">
                {groups.map((group) => (
                  <li key={group.id} className="group relative">
                    <button
                      onClick={() => setSelectedGroupId(group.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                        selectedGroupId === group.id 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${group.color}`}></div>
                      <span className="flex-1 text-left text-sm font-medium truncate">{group.name}</span>
                      {selectedGroupId === group.id && <ChevronRight size={14} />}
                    </button>
                    <button 
                      onClick={(e) => handleDeleteGroup(e, group.id)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 transition-all"
                      title="Eliminar Grupo"
                    >
                      <Trash2 size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white uppercase">
              {user?.username?.substring(0, 2) || 'AD'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">{user?.username || 'Administrador'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.role || 'Admin'}</p>
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
              {activeGroup ? activeGroup.name : 'Selecciona un grupo'}
            </span>
            {activeGroup && (
              <button 
                onClick={() => setIsInviteModalOpen(true)}
                className="ml-4 flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-full transition-all"
              >
                <UserPlus size={14} />
                Invitar
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <Settings size={20} className="text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" />
          </div>
        </header>

        {/* Contenido Dinámico */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeGroup ? (
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Columna Izquierda: Tareas */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Tareas</h2>
                    <p className="text-slate-500 text-sm mt-1">Actividades de {activeGroup.name}</p>
                  </div>
                  <button 
                    onClick={() => setIsTaskModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all font-medium"
                  >
                    <Plus size={18} />
                    Nueva Tarea
                  </button>
                </div>

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
                          {task.is_completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`text-slate-700 font-semibold truncate ${task.is_completed ? 'line-through text-slate-400' : ''}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <Clock size={12} className="text-slate-400" />
                              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Pendiente</span>
                            </div>
                            {task.assigned_to && (
                              <div className="flex items-center gap-1">
                                <User size={12} className="text-slate-400" />
                                <span className="text-[10px] text-slate-400 font-bold">{task.assigned_to}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                      <p className="text-slate-400 font-medium italic">Sin tareas pendientes.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Columna Derecha: Miembros */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 p-4 border-b border-slate-200">
                    <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2 uppercase tracking-wider">
                      <Users size={16} />
                      Miembros del Grupo
                    </h3>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-3 mb-6">
                      {activeGroup.members.map((memberName, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-bold">
                            {memberName.substring(0, 1).toUpperCase()}
                          </div>
                          <span className="font-medium">{memberName}</span>
                        </li>
                      ))}
                    </ul>

                    <form onSubmit={handleAddMember} className="space-y-3">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Nombre del miembro..."
                          className="w-full pl-3 pr-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-xs transition-all"
                          value={newMemberName}
                          onChange={e => setNewMemberName(e.target.value)}
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg text-xs font-bold transition-all"
                      >
                        <Plus size={14} />
                        Añadir Miembro
                      </button>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-500">
              <div className="bg-blue-50 p-6 rounded-full mb-6 text-blue-500">
                <LayoutDashboard size={48} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Bienvenido a BREÑOTASK</h3>
              <p className="text-slate-500 max-w-sm text-sm">
                Selecciona un grupo para gestionar tareas y coordinar miembros.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* MODAL: Crear Tarea */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in duration-300">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Nueva Tarea</h3>
              <button onClick={() => setIsTaskModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Título</label>
                <input 
                  type="text" required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Asignar a</label>
                <select 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  value={newTask.assigned_to}
                  onChange={e => setNewTask({...newTask, assigned_to: e.target.value})}
                >
                  <option value="">Sin asignar</option>
                  {activeGroup?.members.map((name, i) => (
                    <option key={i} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="submit" className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all text-sm">
                  Crear Tarea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Nuevo Grupo */}
      {isNewGroupModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-xs rounded-2xl shadow-2xl animate-in zoom-in duration-300">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Nuevo Grupo</h3>
              <button onClick={() => setIsNewGroupModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateGroup} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Nombre del Grupo</label>
                <input 
                  type="text" required autoFocus
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  value={newGroupName}
                  onChange={e => setNewGroupName(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all text-sm">
                Crear Grupo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Invitación */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl animate-in zoom-in duration-300">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <UserPlus size={20} className="text-blue-600" />
                Invitar
              </h3>
              <button onClick={() => setIsInviteModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSendInvite} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Email o Username</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input 
                    type="text" required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all text-sm">
                Enviar Invitación
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default DashboardPage;
