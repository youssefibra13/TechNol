import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const LogoutPage = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  setUser(null);
  navigate('/login');
  return (
    <></>
  )
}

export default LogoutPage