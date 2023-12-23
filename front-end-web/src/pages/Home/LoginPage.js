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
      <h2>Đăng nhập tài khoản của bạn</h2>
      <form className="login-form">
        {/* <label htmlFor="email">Email:</label> */}
        <input
          type="email"
          id="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* <label htmlFor="password">Mật khẩu:</label> */}
        <input
          type="password"
          id="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" type="button" onClick={handleLogin}>
          Đăng nhập
        </button>
      </form>

      <p>
        Chưa có tài khoản? <Link to="/register">Đăng ký tại dây</Link>
      </p>
    </div>
  );
};

export default LoginPage;
