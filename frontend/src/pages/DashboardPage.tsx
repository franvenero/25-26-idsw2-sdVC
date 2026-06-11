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
  User as UserIcon,
  Filter,
  Edit2,
  UserMinus
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);
  
  // Estado para el grupo seleccionado y filtro de tareas
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [taskFilter, setTaskFilter] = useState<'all' | 'mine'>('all');
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // Inicialización de Grupos con Persistencia Local (Simulación)
  const [groups, setGroups] = useState<Group[]>(() => {
    const saved = localStorage.getItem('bt_groups');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'group-1', name: 'Casa', members: ['Fran', 'Andeco', 'admin'], color: 'bg-emerald-500' },
      { id: 'group-2', name: 'Trabajo', members: ['Jefe', 'admin'], color: 'bg-blue-500' },
      { id: 'group-3', name: 'Gimnasio', members: ['Entrenador', 'admin'], color: 'bg-purple-500' },
    ];
  });

  // Inicialización de Tareas con Persistencia Local (Simulación)
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('bt_tasks');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', title: 'Comprar leche', is_completed: false, group_id: 'group-1', assigned_to: 'Fran' },
      { id: '2', title: 'Lavar la ropa', is_completed: true, group_id: 'group-1', assigned_to: 'admin' },
      { id: '3', title: 'Enviar reporte trimestral', is_completed: false, group_id: 'group-2', assigned_to: 'admin' },
      { id: '4', title: 'Reunión de equipo', is_completed: false, group_id: 'group-2' },
      { id: '5', title: 'Rutina de pierna', is_completed: false, group_id: 'group-3', assigned_to: 'admin' },
    ];
  });

  // Persistencia de datos en localStorage
  useEffect(() => {
    localStorage.setItem('bt_groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('bt_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Estados de Formulario
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assigned_to: '',
    depends_on_id: ''
  });
  const [editTaskData, setEditTaskData] = useState({
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

  // Filtrado de Tareas Dinámico
  const currentGroupTasks = selectedGroupId 
    ? tasks.filter(task => task.group_id === selectedGroupId)
    : [];

  const displayedTasks = taskFilter === 'mine' 
    ? currentGroupTasks.filter(t => t.assigned_to === user?.username)
    : currentGroupTasks;

  // --- Manejadores de Grupos ---
  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const groupToAdd: Group = {
      id: `group-${Math.random().toString(36).substr(2, 5)}`,
      name: newGroupName,
      members: [user?.username || 'admin'],
      color: 'bg-slate-500'
    };

    setGroups([...groups, groupToAdd]);
    setNewGroupName('');
    setIsNewGroupModalOpen(false);
    setSelectedGroupId(groupToAdd.id);
  };

  const handleDeleteGroup = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('¿Deseas eliminar este grupo? Esta acción es irreversible.')) {
      setGroups(groups.filter(g => g.id !== id));
      if (selectedGroupId === id) setSelectedGroupId(null);
      setTasks(tasks.filter(t => t.group_id !== id));
    }
  };

  // --- Manejadores de Miembros ---
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGroup || !newMemberName.trim()) return;

    setGroups(groups.map(g => 
      g.id === activeGroup.id ? { ...g, members: [...g.members, newMemberName.trim()] } : g
    ));
    setNewMemberName('');
  };

  const handleRemoveMember = (memberName: string) => {
    if (!activeGroup) return;
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${memberName} de este grupo?`)) {
      // 1. Quitar miembro del grupo
      setGroups(groups.map(g => 
        g.id === activeGroup.id 
        ? { ...g, members: g.members.filter(m => m !== memberName) } 
        : g
      ));

      // 2. Desasignar tareas de ese miembro en este grupo
      setTasks(tasks.map(t => 
        (t.group_id === activeGroup.id && t.assigned_to === memberName)
        ? { ...t, assigned_to: '' }
        : t
      ));
    }
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

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      setTasks(tasks.filter(t => t.id !== taskId));
    }
  };

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setEditTaskData({
      title: task.title,
      description: task.description || '',
      assigned_to: task.assigned_to || '',
      depends_on_id: task.depends_on_id || ''
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskToEdit) return;

    setTasks(tasks.map(t => 
      t.id === taskToEdit.id 
      ? { 
          ...t, 
          title: editTaskData.title, 
          description: editTaskData.description, 
          assigned_to: editTaskData.assigned_to,
          depends_on_id: editTaskData.depends_on_id || undefined
        } 
      : t
    ));
    setIsEditModalOpen(false);
    setTaskToEdit(null);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-600 p-2 rounded-lg">
              <LayoutDashboard size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white uppercase">Breñotask</span>
          </div>

          <nav className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4 text-slate-400">
                <span className="text-xs font-bold uppercase tracking-widest">Contextos</span>
                <button 
                  onClick={() => setIsNewGroupModalOpen(true)}
                  className="hover:text-white transition-colors p-1 hover:bg-slate-800 rounded-md"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <ul className="space-y-1.5">
                {groups.map((group) => (
                  <li key={group.id} className="group relative">
                    <button
                      onClick={() => setSelectedGroupId(group.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        selectedGroupId === group.id 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${group.color}`}></div>
                      <span className="flex-1 text-left text-sm font-semibold truncate">{group.name}</span>
                      {selectedGroupId === group.id && <ChevronRight size={14} />}
                    </button>
                    <button 
                      onClick={(e) => handleDeleteGroup(e, group.id)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 text-slate-500 hover:text-red-400 transition-all"
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
            <div className="w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center text-xs font-black text-white uppercase border border-slate-600">
              {user?.username?.substring(0, 2) || 'US'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate text-white">{user?.username || 'Usuario'}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{user?.role || 'Miembro'}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-2 text-slate-400 hover:text-red-400 text-xs font-bold transition-colors uppercase tracking-widest"
          >
            <LogOut size={14} />
            Salir
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
          <div className="flex items-center gap-2 text-sm">
            <Folder size={18} className="text-slate-400" />
            <span className="text-slate-400">/</span>
            <span className="font-bold text-slate-800">
              {activeGroup ? activeGroup.name : 'Selecciona un contexto'}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-8 w-px bg-slate-200"></div>
            <Settings size={20} className="text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 lg:p-10 bg-slate-50">
          {activeGroup ? (
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* TAREAS */}
              <div className="lg:col-span-8 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Actividades</h2>
                    <p className="text-slate-500 text-sm font-medium mt-1">Organización en {activeGroup.name}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
                    <button 
                      onClick={() => setTaskFilter('all')}
                      className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                        taskFilter === 'all' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      Todas
                    </button>
                    <button 
                      onClick={() => setTaskFilter('mine')}
                      className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                        taskFilter === 'mine' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      Mis Tareas
                    </button>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-2">
                    <Filter size={14} className="text-blue-500" />
                    {taskFilter === 'mine' ? 'Solo Asignadas' : 'Flujo General'}
                  </div>
                  <button 
                    onClick={() => setIsTaskModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl shadow-lg shadow-blue-600/20 transition-all text-xs font-black uppercase tracking-wider"
                  >
                    <Plus size={16} />
                    Nueva Tarea
                  </button>
                </div>

                <div className="grid gap-4">
                  {displayedTasks.length > 0 ? (
                    displayedTasks.map(task => (
                      <div 
                        key={task.id} 
                        className={`bg-white p-6 rounded-3xl border transition-all flex items-center gap-5 group ${
                          task.is_completed ? 'border-slate-100 opacity-60' : 'border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md'
                        }`}
                      >
                        <button 
                          onClick={() => toggleTaskCompletion(task.id)}
                          className={`transition-all transform active:scale-90 ${task.is_completed ? 'text-emerald-500' : 'text-slate-200 hover:text-blue-400'}`}
                        >
                          {task.is_completed ? <CheckCircle2 size={28} /> : <Circle size={28} />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`text-slate-800 text-lg font-bold truncate ${task.is_completed ? 'line-through text-slate-400' : ''}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center gap-5 mt-3">
                            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                              <Clock size={12} className="text-slate-500" />
                              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Hoy</span>
                            </div>
                            {task.assigned_to && (
                              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                                task.assigned_to === user?.username ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-slate-100 text-slate-600 border border-slate-200'
                              }`}>
                                <UserIcon size={12} />
                                <span className="text-[10px] font-black uppercase tracking-wider">{task.assigned_to === user?.username ? 'MÍO' : task.assigned_to}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button 
                            onClick={() => openEditModal(task)}
                            className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                            title="Editar"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteTask(task.id)}
                            className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20 bg-white rounded-[40px] border-4 border-dashed border-slate-100">
                      <p className="text-slate-300 font-bold italic text-lg">No hay actividades registradas.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* MIEMBROS */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full max-h-[700px]">
                  <div className="bg-slate-900 p-6 flex justify-between items-center">
                    <h3 className="text-xs font-black text-white flex items-center gap-3 uppercase tracking-[0.2em]">
                      <Users size={20} className="text-blue-500" />
                      Equipo
                    </h3>
                    <button 
                      onClick={() => setIsInviteModalOpen(true)}
                      className="bg-white/10 hover:bg-white/20 p-2.5 rounded-2xl text-white transition-all"
                      title="Invitar Miembro"
                    >
                      <UserPlus size={18} />
                    </button>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="space-y-3 mb-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                      {activeGroup.members.map((m, idx) => (
                        <div key={idx} className="flex items-center justify-between group/member p-1">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 text-xs font-black uppercase border border-slate-200 shadow-sm group-hover/member:bg-blue-600 group-hover/member:text-white group-hover/member:border-blue-500 transition-all">
                              {m.substring(0, 1)}
                            </div>
                            <span className="font-bold text-sm text-slate-700 truncate flex-1">
                              {m} {m === user?.username && <span className="text-[10px] text-blue-500 ml-1 font-black">(TÚ)</span>}
                            </span>
                          </div>
                          <button 
                            onClick={() => handleRemoveMember(m)}
                            className="opacity-0 group-hover/member:opacity-100 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Quitar Miembro"
                          >
                            <UserMinus size={16} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleAddMember} className="space-y-4 pt-4 border-t border-slate-100">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Nuevo integrante..."
                          className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-xs font-bold transition-all shadow-inner"
                          value={newMemberName}
                          onChange={e => setNewMemberName(e.target.value)}
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-slate-900 text-white py-3.5 rounded-2xl text-xs font-black hover:bg-slate-800 transition-all uppercase tracking-widest shadow-xl shadow-slate-900/10"
                      >
                        Añadir Manualmente
                      </button>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-1000">
              <div className="bg-white p-10 rounded-[50px] shadow-2xl shadow-blue-900/5 mb-8 text-blue-600 border border-slate-100">
                <LayoutDashboard size={64} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Panel Central</h3>
              <p className="text-slate-400 max-w-sm text-base font-medium">
                Selecciona un contexto de trabajo en la barra lateral para gestionar tus flujos operativos.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* MODAL: Crear Tarea */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl animate-in zoom-in duration-200 overflow-hidden border border-slate-100">
            <div className="flex items-center justify-between p-8 border-b border-slate-100 bg-slate-50">
              <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase tracking-wider">Nueva Actividad</h3>
              <button onClick={() => setIsTaskModalOpen(false)} className="bg-white p-2 rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm border border-slate-100">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-[0.2em] pl-1">Título de la actividad</label>
                <input 
                  type="text" required
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-bold shadow-inner"
                  placeholder="Ej: Análisis de requerimientos"
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-[0.2em] pl-1">Responsable</label>
                <select 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-bold appearance-none cursor-pointer shadow-inner"
                  value={newTask.assigned_to}
                  onChange={e => setNewTask({...newTask, assigned_to: e.target.value})}
                >
                  <option value="">Sin asignar</option>
                  {activeGroup?.members.map((name, i) => (
                    <option key={i} value={name}>{name === user?.username ? `${name} (Tú)` : name}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="flex-1 py-4 border-2 border-slate-100 text-slate-400 font-black rounded-3xl hover:bg-slate-50 transition-all text-[10px] uppercase tracking-widest"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-4 bg-blue-600 text-white font-black rounded-3xl hover:bg-blue-700 shadow-xl shadow-blue-600/30 transition-all text-[10px] uppercase tracking-widest"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Editar Tarea */}
      {isEditModalOpen && taskToEdit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl animate-in zoom-in duration-200 overflow-hidden border border-slate-100">
            <div className="flex items-center justify-between p-8 border-b border-slate-100 bg-slate-50">
              <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase tracking-wider">Ajustar Tarea</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="bg-white p-2 rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm border border-slate-100">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdateTask} className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-[0.2em] pl-1">Título</label>
                <input 
                  type="text" required
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-bold shadow-inner"
                  value={editTaskData.title}
                  onChange={e => setEditTaskData({...editTaskData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-[0.2em] pl-1">Asignar a</label>
                <select 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-bold cursor-pointer shadow-inner"
                  value={editTaskData.assigned_to}
                  onChange={e => setEditTaskData({...editTaskData, assigned_to: e.target.value})}
                >
                  <option value="">Sin asignar</option>
                  {activeGroup?.members.map((name, i) => (
                    <option key={i} value={name}>{name === user?.username ? `${name} (Tú)` : name}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full py-5 bg-slate-900 text-white font-black rounded-3xl hover:bg-slate-800 shadow-2xl shadow-slate-900/20 transition-all text-[10px] uppercase tracking-widest">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Nuevo Grupo */}
      {isNewGroupModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xs rounded-[40px] shadow-2xl animate-in zoom-in duration-200 overflow-hidden border border-slate-100">
            <div className="flex items-center justify-between p-8 border-b border-slate-100 bg-slate-50">
              <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase tracking-wider">Nuevo Contexto</h3>
              <button onClick={() => setIsNewGroupModalOpen(false)} className="bg-white p-2 rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm border border-slate-100">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateGroup} className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-[0.2em] pl-1">Nombre</label>
                <input 
                  type="text" required autoFocus
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-bold shadow-inner"
                  placeholder="Ej: Personal"
                  value={newGroupName}
                  onChange={e => setNewGroupName(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full py-5 bg-slate-900 text-white font-black rounded-3xl hover:bg-slate-800 shadow-xl transition-all text-[10px] uppercase tracking-widest">
                Crear Grupo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Invitación */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[40px] shadow-2xl animate-in zoom-in duration-200 overflow-hidden border border-slate-100">
            <div className="flex items-center justify-between p-8 border-b border-slate-100 bg-slate-50">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-wider">
                <UserPlus size={24} className="text-blue-600" />
                Invitar
              </h3>
              <button onClick={() => setIsInviteModalOpen(false)} className="bg-white p-2 rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm border border-slate-100">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Invitación enviada a ${inviteEmail}`);
              setInviteEmail('');
              setIsInviteModalOpen(false);
            }} className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-[0.2em] pl-1">Email del destinatario</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-5 h-4 w-4 text-slate-400" />
                  <input 
                    type="email" required
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-bold shadow-inner"
                    placeholder="correo@servidor.com"
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-3xl hover:bg-blue-700 shadow-xl shadow-blue-600/30 transition-all text-[10px] uppercase tracking-widest">
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
