import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../hooks/useTasks";
import { useMembers } from "../hooks/useMembers";
import { UserRole } from "../types/auth";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import MemberForm from "../components/members/MemberForm";
import MemberList from "../components/members/MemberList";

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { 
    tasks, 
    isLoading: tasksLoading, 
    error: tasksError,
    createTask, 
    deleteTask, 
    updateTask,
    addDependencies 
  } = useTasks();
  
  const { 
    members, 
    loading: membersLoading, 
    addMember, 
    updateRole, 
    deactivateMember 
  } = useMembers();

  const [activeTab, setActiveTab] = useState<"tasks" | "team">("tasks");

  if (!user) return null;

  const isAdmin = user.role === UserRole.ADMIN || user.role === UserRole.ADMIN_MEMBER;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* SaaS Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="text-white text-lg font-bold">V</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">VibeTask</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold">{user.username}</p>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{user.role}</p>
            </div>
            <button
              onClick={logout}
              className="bg-white border border-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg text-sm transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section / SaaS Tabs */}
      <main className="max-w-5xl mx-auto w-full p-6 sm:p-8 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Panel de Control</h2>
            <p className="text-slate-500 font-medium">Gestiona tu equipo y tareas en tiempo real</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setActiveTab("tasks")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === "tasks"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Tareas
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === "team"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Equipo
            </button>
          </div>
        </div>

        {activeTab === "tasks" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-500">
            {/* Sidebar / Form */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Añadir Actividad</h3>
                <TaskForm onAdd={createTask} />
              </div>
            </aside>

            {/* List */}
            <section className="lg:col-span-8">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-bold text-slate-900">Tareas Pendientes</h3>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">{tasks.length} total</span>
              </div>
              <TaskList
                tasks={tasks}
                allTasks={tasks}
                members={members}
                isLoading={tasksLoading}
                error={tasksError}
                onDelete={deleteTask}
                onUpdate={updateTask}
                onAddDependencies={addDependencies}
              />
            </section>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <section className="md:col-span-5 lg:col-span-4">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Invitar Miembro</h3>
                  {isAdmin ? (
                    <MemberForm onAdd={addMember} />
                  ) : (
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-500 font-medium italic">
                      Acceso restringido a administradores.
                    </div>
                  )}
                </div>
              </section>

              <section className="md:col-span-7 lg:col-span-8">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className="font-bold text-slate-900">Directorio del Equipo</h3>
                </div>
                {membersLoading ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-slate-100 animate-pulse text-slate-300">
                    Sincronizando equipo...
                  </div>
                ) : (
                  <MemberList
                    members={members}
                    currentUser={user}
                    onUpdateRole={updateRole}
                    onDeactivate={deactivateMember}
                  />
                )}
              </section>
            </div>
          </div>
        )}
      </main>
      
      <footer className="py-8 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
        VibeTask &bull; SaaS Architecture &bull; 2026
      </footer>
    </div>
  );
};

export default DashboardPage;
