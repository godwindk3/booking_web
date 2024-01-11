import React from 'react';
import axios from '../Home/axiosConfig';

const DeleteBookingButton = ({ bookingId }) => {
  const handleDelete = async () => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem('token');

      // Validate token presence
      if (!token) {
        console.error('Token not found. User not authenticated.');
        // Handle authentication error (e.g., redirect to login page)
        return;
      }

      // Send DELETE request with authorization header
      await axios.delete(`/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle success (e.g., refresh booking list, show a success message)
      console.log(`Booking with ID ${bookingId} deleted successfully.`);
      alert('Booking deleted successfully.')
    } catch (error) {
      console.error('Error deleting booking:', error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete Booking
    </button>
  );
};

export default DeleteBookingButton;
