// PrivateRoute.js
import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

const PrivateRoute = (props) => {

  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };
  return isAuthenticated() ? (
    <>
      {props.children}
    </>
  ) : (
    <Navigate to="/login" replace />
    // or you can render a warning message
    // <p>You are not authenticated. Please log in.</p>
  );
};

export default PrivateRoute;
