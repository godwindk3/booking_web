import React from 'react';
import axios from './axiosConfig';
import './AccommodationDetachButton.css'

const AccommodationDetachButton = ({ accommodationId, amenityId }) => {
  const handleDetach = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `/amenity/accommodation/detach/${accommodationId}/${amenityId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Amenity detached successfully');
        alert('Amenity detached successfully')
        // Additional logic after successful detachment
        // You may want to update the UI or perform other actions
      } else {
        console.error('Amenity detachment failed');
        // Additional logic after failed detachment
      }
    } catch (error) {
      console.error('Error during amenity detachment:', error.message);
    }
  };

  return (
    <button className='detach-amenity-button' onClick={handleDetach}>x</button>
  );
};

export default AccommodationDetachButton;
