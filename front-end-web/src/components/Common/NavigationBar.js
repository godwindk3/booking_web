// components/Common/NavigationBar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
const NavigationBar = ({ toggleSideBar }) => {
  // State to track whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Perform logout actions and update the state
    setIsLoggedIn(false);
    // Additional logout logic if needed
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about">About</Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
      <div className="buttons-container">
        {isLoggedIn ? (
          <>
            <div className="logout-button">
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="user-info">
              {/* Display user information or profile picture */}
              User Info
            </div>
          </>
        ) : (
          <>
            <div className="login-button">
              <Link to="/login">Login</Link>
            </div>
            <div className="register-button">
              <Link to="/register">Register</Link>
            </div>
          </>
        )}
        <div className="currency-button">
          {/* Add your currency selection logic or dropdown here */}
          Currency
        </div>
        <div className="country-icon">
          {/* Add your country icon or flag here */}
          Country Icon
        </div>
      </div>

    </nav>
  );
};

export default NavigationBar;
