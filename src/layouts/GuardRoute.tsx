import { useAuth } from 'features/auth/authContext';
import React from 'react';
import { Navigate } from 'react-router-dom';

export const GuardRoute = ({ children }: { children: any }) => {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export const GuardAuthRoute = ({ children }: { children: any }) => {
  const { state } = useAuth();

  if (state.isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return children;
};
