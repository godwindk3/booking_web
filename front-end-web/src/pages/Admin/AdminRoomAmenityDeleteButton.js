import React, { useState } from 'react';
import axios from '../Home/axiosConfig';

const AdminRoomAmenityDeleteButton = ({ amenityId }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleDeleteRoomAmenity = async () => {
    try {
      // Validate token
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Token not found. Please log in.');
        return;
      }

      // Make DELETE request to delete room amenity
      const response = await axios.delete(`/amenity/room/${amenityId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle success
      if (response.status === 200) {
        setSuccessMessage('Room amenity deleted successfully!');
        setErrorMessage('');
        // Optionally, you can trigger any necessary state updates or actions here.
        alert('Room amenity deleted successfully!')
      }
    } catch (error) {
      // Handle error
      console.error('Error deleting room amenity:', error);
      setErrorMessage('Error deleting room amenity. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <button className='detach-amenity-button' onClick={handleDeleteRoomAmenity}>x</button>
      {errorMessage && (
        <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
      )}
      {successMessage && (
        <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>
      )}
    </div>
  );
};

export default AdminRoomAmenityDeleteButton;
