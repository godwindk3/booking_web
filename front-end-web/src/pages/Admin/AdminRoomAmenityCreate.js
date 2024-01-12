import React, { useState } from 'react';
import axios from '../Home/axiosConfig';

const AdminRoomAmenityCreate = () => {
  const [amenityName, setAmenityName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateRoomAmenity = async () => {
    try {
      // Validate token
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Token not found. Please log in.');
        return;
      }

      // Validate amenity name
      if (!amenityName) {
        setErrorMessage('Please enter an amenity name.');
        return;
      }

      // Make POST request to create room amenity
      const response = await axios.post('/amenity/room', { name: amenityName }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle success
      if (response.status === 201) {
        setSuccessMessage('Room amenity created successfully!');
        setErrorMessage('');
        // Optionally, you can reset the input field here:
        setAmenityName('');
        alert('Room amenity created successfully!')
      }
    } catch (error) {
      // Handle error
      console.error('Error creating room amenity:', error);
      setErrorMessage('Error creating room amenity. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Create Room Amenity</h2>
      <div>
        <label>
          Amenity Name:
          <input
            type="text"
            value={amenityName}
            onChange={(e) => setAmenityName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleCreateRoomAmenity}>Create Room Amenity</button>
      </div>
      {errorMessage && (
        <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
      )}
      {successMessage && (
        <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>
      )}
    </div>
  );
};

export default AdminRoomAmenityCreate;
