import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

  // If authenticated, render the child routes, otherwise redirect to the login page.
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
