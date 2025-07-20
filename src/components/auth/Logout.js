import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress'; // If using Material-UI

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        navigate('/login', { 
          state: { message: 'You have been logged out successfully' },
          replace: true 
        });
      } catch (err) {
        setError('Logout failed. Please try again.');
        console.error('Logout error:', err);
      } finally {
        setLoading(false);
      }
    };

    performLogout();
  }, [logout, navigate]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <CircularProgress /> {/* Or use a simple <div>Loading...</div> */}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
        {error}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return null; // Will redirect before rendering
};

export default Logout;