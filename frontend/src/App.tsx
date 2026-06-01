import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Bienvenido al Sistema de Gestión de Tareas</h1>
      <p>Has iniciado sesión correctamente.</p>
      <button 
        onClick={logout}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#d32f2f',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Redirección por defecto */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
