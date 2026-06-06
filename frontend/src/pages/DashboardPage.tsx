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
    updateTaskStatus,
    updateTask 
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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Gestor Familiar</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Bienvenido, <strong>{user.username}</strong> ({user.role})
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Navigation */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`pb-4 px-4 text-sm font-medium transition-colors ${
              activeTab === "tasks"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Tareas
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`pb-4 px-4 text-sm font-medium transition-colors ${
              activeTab === "team"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Equipo / Familia
          </button>
        </div>

        {activeTab === "tasks" ? (
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Nueva Tarea</h2>
              <TaskForm onAdd={createTask} />
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Mis Tareas / Tareas del Grupo</h2>
              <TaskList
                tasks={tasks}
                members={members}
                isLoading={tasksLoading}
                error={tasksError}
                onDelete={deleteTask}
                onStatusChange={updateTaskStatus}
                onUpdate={updateTask}
              />
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Equipo</h2>
              {isAdmin && <MemberForm onAdd={addMember} />}
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Miembros de la Familia</h2>
              {membersLoading ? (
                <p>Cargando miembros...</p>
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
    </div>
  );
};

export default DashboardPage;
