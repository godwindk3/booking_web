import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './LoginPage.css'; // Import your stylesheet if needed

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://your-fastapi-server-url/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // Login successful
        console.log('Login successful');
        // Additional logic after successful login
      } else {
        // Login failed
        console.error('Login failed');
        // Additional logic after failed login
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <div className="login-page-container">
      <h2>Login to Your Account</h2>
      <form className="login-form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
