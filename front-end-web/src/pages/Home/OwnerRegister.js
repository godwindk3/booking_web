import React, { useState } from 'react';
import axios from './axiosConfig';
import Modal from 'react-modal';
import validator from 'validator';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

const OwnerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 1, // Set role to 1 for manager
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email' && !validator.isEmail(value)) {
      setErrorMessage('Invalid email format');
    } else {
      setErrorMessage(null);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage('Please fill in all the required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrorMessage('Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ cái IN HOA');
      return;
    }

    try {
      const response = await axios.post(
        '/register',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        console.log('Registration successful');
        openModal();
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error.message);

      if (error.response && error.response.status === 400) {
        setErrorMessage('Email is already in use. Please choose a different email.');
      } else {
        setErrorMessage('Error during registration. Please try again.');
      }
    }
  };

  return (
    <div className='Register-Page'>
      <h2>Đăng ký tài khoản đối tác</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          id="name"
          placeholder="Nhập tên tài khoản"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          id="email"
          placeholder="Nhập email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder="Nhập mật khẩu"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type={showPassword ? 'text' : 'password'}
          id="confirmPassword"
          placeholder="Xác nhận mật khẩu"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <div className="register-button-container">
          <button className="register-button" type="button" onClick={togglePasswordVisibility}>
            {showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          </button>

          <button className="register-button" type="submit">Đăng ký</button>
        </div>
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Registration Successful"
      >
        <h2>Đăng ký thành công</h2>
        <p>Tự động chuyển sang trang đăng nhập sau 3 giây</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default OwnerRegister;
