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
      if (err.response?.status === 401) {
        setError('Usuario o contraseña incorrectos');
      } else {
        setError('Ocurrió un error al intentar iniciar sesión. Por favor, intente de nuevo.');
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
      height: '100vh',
      fontFamily: 'sans-serif',
      backgroundColor: '#f4f4f9'
    }}>
      <div style={{
        padding: '2rem',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Iniciar Sesión</h2>
        
        {error && (
          <div style={{
            padding: '0.75rem',
            marginBottom: '1rem',
            borderRadius: '4px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: loading ? '#9e9e9e' : '#1976d2',
              color: '#fff',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
