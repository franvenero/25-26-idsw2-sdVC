import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { tasks, isLoading, error, createTask, updateTask, updateTaskStatus, deleteTask } = useTasks();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f4f7f6',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      {/* Header / Navigation Bar */}
      <nav style={{
        backgroundColor: '#ffffff',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#2c3e50' }}>
          Sistema de Gestión
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#2c3e50', fontWeight: 600 }}>{user?.username}</div>
            <div style={{ color: '#7f8c8d', fontSize: '0.8rem', textTransform: 'lowercase' }}>{user?.role}</div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c0392b')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#e74c3c')}
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem'
      }}>
        {/* Left Column: Form (for admins) and Info */}
        <section>
          <TaskForm onSubmit={createTask} />
          
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            border: '1px solid #ddd'
          }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Panel Informativo</h3>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
              Bienvenido al gestor de tareas. Aquí puedes visualizar las actividades asignadas, cambiar su estado y, si tienes permisos, crear nuevas tareas para el equipo.
            </p>
            <div style={{ 
              marginTop: '1rem', 
              padding: '0.8rem', 
              backgroundColor: '#e8f4fd', 
              borderRadius: '4px',
              borderLeft: '4px solid #3498db',
              color: '#2980b9',
              fontSize: '0.85rem'
            }}>
              <strong>Estado del Sistema:</strong> Operativo
            </div>
          </div>
        </section>

        {/* Right Column: Task List */}
        <section>
          <TaskList 
            tasks={tasks} 
            isLoading={isLoading} 
            error={error} 
            onStatusChange={updateTaskStatus} 
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
