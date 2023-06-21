import axios from 'axios';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function PrivateLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  async function fetchUser() {
    if (token) {
      try {
        await axios.get('https://mock-api.arikmpt.com/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        navigate('/login');
      }
      return;
    }
    navigate('/login');
  }

  useEffect(() => {
    fetchUser();
  }, [navigate]);

  return <Outlet />;
}

export default PrivateLayout;