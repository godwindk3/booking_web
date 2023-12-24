// components/Common/NavigationBar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
      {/* <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about">About</Link>
        </li>
      </ul>
      <div className="buttons-container">
        {isLoggedIn ? (
          <>
            <div className="logout-button">
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="user-info">
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
          Currency
        </div>
        <div className="country-icon">
          Country Icon
        </div>
      </div> */}

        <section className="Header">
            <div className="container flex justify-between align-center Header_container_main">
                <div className="flex align-center gap-40 h-full">

                    <div className="logo">
                        <NavLink exact to="/">
                            <button className="home-button">
                            <booking>Booking</booking>
                            <vn>.vn</vn>
                            </button>
                        </NavLink>
                        </div>

                        <div className="flex gap-24 h-full align-center cursor-pointer Header_nav_container">

                        <button className="h-full flex align-center nav-button">
                            Tìm khách sạn
                        </button>


                        <NavLink exact to="/about" style={{ textDecoration: 'none' }}>
                            <button className="h-full flex align-center nav-button">
                            Về chúng tôi
                            </button>
                        </NavLink>

                        <button className="h-full flex align-center doitac-button gap-24 nav-button">
                            Trở thành đối tác của chúng tôi
                        </button>

                        <NavLink exact to="/login" style={{ textDecoration: 'none' }}>
                            <button className="flex align-center gap-24 login-button">
                            Đăng nhập
                            </button>
                        </NavLink>
                    </div>

                </div>
            </div>
        </section>

    </nav>
  );
};

export default NavigationBar;
