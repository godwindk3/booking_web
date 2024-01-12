import React from 'react';
import axios from '../Home/axiosConfig';

import './AdminDeletePaymentButton.css';

const AdminDeletePaymentButton = ({ paymentId }) => {
  const handleDeletePayment = async () => {
    try {
      // Validate token
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token not found. Please log in.');
        return;
      }

      // Make DELETE request to delete payment
      const response = await axios.delete(`/payment/delete_payment/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle success
      if (response.status === 200) {
        alert('Payment deleted successfully!');
        console.log('Deleted successfully')
      }
    } catch (error) {
      // Handle error
      console.error('Error deleting payment:', error);
      alert('Error deleting payment. Please try again.');
    }
  };

  return (
    <button className='detach-amenity-button' onClick={handleDeletePayment}>
      x
    </button>
  );
};

export default AdminDeletePaymentButton;
