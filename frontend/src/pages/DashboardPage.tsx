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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <span className="text-white text-xl">🏠</span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">VibeTask</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-bold text-gray-900">{user.username}</span>
              <span className="text-[10px] uppercase font-black text-blue-500 tracking-widest">{user.role}</span>
            </div>
            <button
              onClick={logout}
              className="px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-all shadow-md active:scale-95"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto w-full px-4 py-10 flex-1">
        {/* Tabs Navigation */}
        <div className="flex p-1.5 bg-gray-200/50 rounded-2xl mb-10 w-fit mx-auto">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === "tasks"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            📋 Tareas del Grupo
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === "team"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            👥 Familia / Equipo
          </button>
        </div>

        {activeTab === "tasks" ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section>
              <TaskForm onAdd={createTask} />
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
                  <span>Listado de Tareas</span>
                  <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-lg">{tasks.length}</span>
                </h2>
              </div>
              <TaskList
                tasks={tasks}
                allTasks={tasks} // En este contexto, todas las tareas visibles pueden ser dependencias
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
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-black mb-6 text-gray-800">Añadir Miembro</h2>
              {isAdmin ? (
                <MemberForm onAdd={addMember} />
              ) : (
                <div className="p-4 bg-yellow-50 text-yellow-700 rounded-xl border border-yellow-100 text-sm italic">
                  Solo los administradores pueden añadir nuevos miembros.
                </div>
              )}
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-black mb-6 text-gray-800">Miembros Actuales</h2>
              {membersLoading ? (
                <div className="animate-pulse flex space-y-4 flex-col">
                  <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
                  <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
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
        )}
      </main>
      
      <footer className="py-8 text-center text-gray-400 text-xs">
        &copy; 2026 VibeTask IDSW2 - Sistema de Coordinación Grupal
      </footer>
    </div>
  );
};

export default DashboardPage;
