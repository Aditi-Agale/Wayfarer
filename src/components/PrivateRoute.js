import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../pages/firebase';

const PrivateRoute = ({ children }) => {
  return auth.currentUser ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;