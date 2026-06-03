import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
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
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#2c3e50' }}>
          Sistema de Gestión
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ color: '#7f8c8d', fontWeight: 500 }}>
            {user?.username ? `Usuario: ${user.username}` : 'Bienvenido'}
          </span>
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
        padding: '3rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '2.5rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#34495e', marginBottom: '1rem' }}>
            ¡Bienvenido, {user?.username || 'admin'}!
          </h2>
          <p style={{ color: '#95a5a6', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Estado: <span style={{ color: '#27ae60', fontWeight: 'bold' }}>Sistema Disponible</span>
          </p>
          <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '2rem 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={cardStyle}>
              <h3>Resumen de Tareas</h3>
              <p>No tienes tareas pendientes para hoy.</p>
            </div>
            <div style={cardStyle}>
              <h3>Notificaciones</h3>
              <p>No hay alertas nuevas en tu bandeja.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  padding: '1.5rem',
  border: '1px solid #ecf0f1',
  borderRadius: '6px',
  textAlign: 'left',
  backgroundColor: '#fdfdfd'
};

export default DashboardPage;
