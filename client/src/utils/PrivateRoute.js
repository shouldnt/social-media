import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const context = useContext(AuthContext);
  if(!context.user) {
    return <Navigate to="/"/>;
  }
  return children;
}

export default PrivateRoute;
