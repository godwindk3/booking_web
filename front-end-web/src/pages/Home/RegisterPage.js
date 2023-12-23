import React, { useState } from 'react';
import axios from './axiosConfig';
import Modal from 'react-modal';
import validator from 'validator'; // Import the validator library
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 0,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Email validation using the validator library
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

    // Check if any required field is empty
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage('Please fill in all the required fields.');
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Check if password meets the requirements
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrorMessage('Password must be at least 8 characters and contain at least one UPPERCASE letter.');
      return;
    }

    try {
      const response = await axios.post(
        '/admin/users',
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
        // Registration successful
        console.log('Registration successful');
        openModal(); // Open the success modal
        // Additional logic after successful registration
      } else {
        // Registration failed
        console.error('Registration failed');
        // Additional logic after failed registration
      }
    } catch (error) {
      console.error('Error during registration:', error.message);

      // Check if the error is due to duplicate email
      if (error.response && error.response.status === 400) {
        setErrorMessage('Email is already in use. Please choose a different email.');
      } else {
        setErrorMessage('Error during registration. Please try again.');
      }
    }
  };

  return (
    <div className='Register-Page'>
      <h2>Register</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide Password' : 'Show Password'}
        </button>

        <button type="submit">Register</button>
      </form>

      {/* Success Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Registration Successful"
      >
        <h2>Registration Successful!</h2>
        <p>Your account has been successfully registered.</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default RegisterPage;
