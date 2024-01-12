import React, { useState } from 'react';
import axios from '../Home/axiosConfig';

const AdminAccommodationAmenityDeleteButton = ({ amenityId }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleDeleteAccommodationAmenity = async () => {
    try {
      // Validate token
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Token not found. Please log in.');
        return;
      }

      // Make DELETE request to delete accommodation amenity
      const response = await axios.delete(`/amenity/accommodation/${amenityId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle success
      if (response.status === 200) {
        setSuccessMessage('Accommodation amenity deleted successfully!');
        setErrorMessage('');
        alert('Accommodation amenity deleted successfully!')
        // Optionally, you can trigger any necessary state updates or actions here.
      }
    } catch (error) {
      // Handle error
      console.error('Error deleting accommodation amenity:', error);
      setErrorMessage('Error deleting accommodation amenity. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <button onClick={handleDeleteAccommodationAmenity}>Delete Accommodation Amenity</button>
      {errorMessage && (
        <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
      )}
      {successMessage && (
        <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>
      )}
    </div>
  );
};

export default AdminAccommodationAmenityDeleteButton;
