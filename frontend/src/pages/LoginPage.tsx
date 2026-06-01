import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ username, password });
      navigate('/dashboard');
    } catch (err: any) {
      // Manejo de errores amigable
      if (err.response?.status === 401) {
        setError('Las credenciales ingresadas no son válidas.');
      } else if (err.response?.status === 422) {
        setError('El formato de los datos es incorrecto.');
      } else if (!err.response) {
        setError('No se pudo conectar con el servidor. Verifique su conexión.');
      } else {
        setError('Ocurrió un error inesperado. Por favor, intente más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#f0f2f5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <div style={{
        padding: '2.5rem',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        boxSizing: 'border-box'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem', 
          color: '#1c1e21',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          Gestión de Tareas
        </h1>
        
        {error && (
          <div style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            borderRadius: '6px',
            backgroundColor: '#fff1f0',
            border: '1px solid #ffa39e',
            color: '#cf1322',
            fontSize: '0.9rem',
            textAlign: 'left'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="username" style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#4b4b4b',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              Nombre de usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su usuario"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '6px',
                border: '1px solid #d9d9d9',
                fontSize: '1rem',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="password" style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#4b4b4b',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '6px',
                border: '1px solid #d9d9d9',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.9rem',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: loading ? '#91d5ff' : '#1890ff',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s',
              boxShadow: '0 2px 0 rgba(0,0,0,0.045)'
            }}
          >
            {loading ? 'Iniciando sesión...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
