import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './HomePage.css'; // Import your stylesheet if needed

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('user'); // Default role is set to 'user'

  const handleLogin = () => {
    // Implement your login logic here
    // You may use a state management library (e.g., Redux) or make an API call to authenticate the user
    console.log('Logging in with:', { username, password, role: selectedRole });
  };

  return (
    <div className="home-page">
      <h1>Welcome to the Home Page</h1>
      <p>This is a simple example of a home page in your React application.</p>
      <p>Feel free to customize and add more content.</p>

      <div className="login-form">
        <h2>Login</h2>
        <form>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label>
            Role:
            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="hotel_owner">Hotel Owner</option>
              <option value="manager">Manager</option>
            </select>
          </label>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>

      <div className="navigation-links">
        {/* Example navigation links */}
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </div>
  );
};

export default HomePage;
