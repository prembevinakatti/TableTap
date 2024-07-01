import React from 'react';
import authService from '../../appwrite/authservices';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authslice';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.logout().then(() => {
      navigate('/');
      dispatch(logout());
    });
  };

  return (
    <button onClick={handleLogout} className="btn btn-wide bg-red-600 text-white btn-wide">
      Logout
    </button>
  );
};

export default Logout;
