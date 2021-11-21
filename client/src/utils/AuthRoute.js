import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { Route, Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const context = useContext(AuthContext);
  if(context.user) {
    return <Navigate to="/"/>;
  }
  return children;
}

export default AuthRoute;
