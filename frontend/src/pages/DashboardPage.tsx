import React from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: '#333'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        paddingBottom: '1rem',
        marginBottom: '2rem'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Dashboard</h1>
        <button
          onClick={logout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#ff4d4f',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Cerrar Sesión
        </button>
      </header>

      <main style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ marginTop: 0 }}>
          ¡Bienvenido, {user?.username || 'Usuario'}!
        </h2>
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          Este es el estado <span style={{ fontWeight: 'bold', color: '#52c41a' }}>:SistemaDisponible</span>. 
          Aquí podrás gestionar tus tareas diarias en un espacio común una vez que se implementen las funcionalidades correspondientes.
        </p>
      </main>
    </div>
  );
};

export default DashboardPage;
