import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Retrieve the JWT from local storage
  const jwtFromLocalStorage = localStorage.getItem('token');

  if (jwtFromLocalStorage) {
    try {
      // Split the JWT into header, payload, and signature
      const [header, payloadBase64, signature] = jwtFromLocalStorage.split('.');

      // Decode the payload from Base64
      const decodedPayload = JSON.parse(atob(payloadBase64));

      // Check if the "role" attribute equals 1
      return decodedPayload.role === 1;
    } catch (error) {
      console.error('Error decoding or processing the JWT:', error.message);
      // Return false in case of an error
      return false;
    }
  } else {
    // Return false if JWT is not found in local storage
    return false;
  }
};

const PrivateOwnerRoute = (props) => {
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

export default PrivateOwnerRoute
