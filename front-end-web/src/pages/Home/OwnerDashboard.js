// Them, sua, xoa, khach san
// Them sua, xoa, phong
// Lay dc nguoi dung cua khach san
import React, { useState } from 'react';
import axios from './axiosConfig';

const OwnerDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage

      const response = await axios.post('/accommodation/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        // Successfully created accommodation
        console.log('Accommodation created successfully');
        // Additional logic after successful creation
      } else {
        // Accommodation creation failed
        console.error('Accommodation creation failed');
        // Additional logic after failed creation
      }
    } catch (error) {
      console.error('Error during accommodation creation:', error.message);

      // Check for validation errors or other specific errors
      if (error.response && error.response.status === 400) {
        setError('Validation error. Please check your input.');
      } else {
        setError('Error during accommodation creation. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Owner Dashboard</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <button type="submit">Create Accommodation</button>
      </form>
    </div>
  );
};

export default OwnerDashboard;
