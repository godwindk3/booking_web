// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from './axiosConfig';
// import './LoginPage.css';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('/login', {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         // Login successful
//         console.log(response)
//         const token = response.data.access_token;
//         const [header, payload, signature] = token.split('.');
//         const decodedPayload = JSON.parse(atob(payload));
//         console.log(decodedPayload.role);
//         // console.log(token)
//         // Store the token in state or local storage
//         // For example, storing in state:
//         // setToken(token);

//         // Storing in local storage
//         localStorage.setItem('token', token);
//         // Navigate to the home page or another protected route
//         if (decodedPayload.role === 0){
//           navigate('/');
//         }
//         else {
//           alert('Error')
//         }
//         // Additional logic after successful login
//       } else {
//         // Login failed
//         setErrorMessage('Login failed. Please check your credentials.');
//         // Additional logic after failed login
//       }
//     } catch (error) {
//       console.error('Error during login:', error.message);
//       setErrorMessage('Error during login. Please try again.');
//     }
//   };

//   return (
//     <div className="login-page-container">
//       <h2>Đăng nhập tài khoản của bạn</h2>
//       <form className="login-form">
//         <input
//           type="email"
//           id="email"
//           placeholder="Nhập email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           id="password"
//           placeholder="Nhập mật khẩu"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="login-button" type="button" onClick={handleLogin}>
//           Đăng nhập
//         </button>

//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//       </form>

//       <p>
//         Chưa có tài khoản? <Link to="/register">Đăng ký tại đây</Link>
//       </p>
//     </div>
//   );
// };

// export default LoginPage;
// LoginPage.js

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from './axiosConfig';
// import './LoginPage.css';

// const LoginPage = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('/login', {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         const token = response.data.access_token;
//         const decodedPayload = JSON.parse(atob(token.split('.')[1]));

//         // Store the token in local storage
//         localStorage.setItem('token', token);

//         if (decodedPayload.role === 0 || decodedPayload.role === 1) {
//           onLogin(); // Notify the higher-level component about the login
//           navigate('/');
//         }
//          else {
//           setErrorMessage('Invalid user role. Please contact support.');
//         }
//       } else {
//         setErrorMessage('Login failed. Please check your credentials.');
//       }
//     } catch (error) {
//       console.error('Error during login:', error.message);
//       setErrorMessage('Error during login. Please try again.');
//     }
//   };

//   return (
//     <div className="login-page-container">
//       <h2>Đăng nhập tài khoản của bạn</h2>
//       <form className="login-form">
//         <input
//           type="email"
//           id="email"
//           placeholder="Nhập email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           id="password"
//           placeholder="Nhập mật khẩu"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="login-button" type="button" onClick={handleLogin}>
//           Đăng nhập
//         </button>

//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//       </form>

//       <p>
//         Chưa có tài khoản? <Link to="/register">Đăng ký tại đây</Link>
//       </p>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from './axiosConfig';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to home page or another route if logged in
      alert('Please log out before logging in again.');
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post('/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.access_token;
        const decodedPayload = JSON.parse(atob(token.split('.')[1]));

        // Store the token in local storage
        localStorage.setItem('token', token);

        if (decodedPayload.role === 0 || decodedPayload.role === 1 || decodedPayload.role === 2) {
          onLogin(); // Notify the higher-level component about the login
          navigate('/');
        } else {
          setErrorMessage('Invalid user role. Please contact support.');
        }
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);

      if (error.response) {
        // Specific error messages based on status or type
        if (error.response.status === 401) {
          setErrorMessage('Invalid email or password.');
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
      } else {
        setErrorMessage('Network error. Please check your internet connection.');
      }
    }
  };

  return (
    <div className="login-page-container">
      <h2>Đăng nhập tài khoản của bạn</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          id="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          id="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" type="submit">
          Đăng nhập
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>

      <p>
        Chưa có tài khoản? <Link to="/register">Đăng ký tại đây</Link>
      </p>
    </div>
  );
};

export default LoginPage;
